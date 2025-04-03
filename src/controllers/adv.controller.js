import { upload } from "../middleware/multer.middleware.js";
import Adv from "../models/Adv.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";
// import YouTube from "../models/Youtube.model.js";
// import fs from "fs";

// Controller to add a new advertisement
export const addAdv = async (req, res) => {
  try {
    // Validate request
    if (!req.files || Object.keys(req.files).length < 3) {
      return res.status(400).json({
        message: "Minimum three images are required",
        required: ["img1", "img2", "img3"],
      });
    }

    // Check each required image exists
    const requiredImages = ["img1", "img2", "img3"];
    for (const img of requiredImages) {
      if (!req.files[img] || !req.files[img][0]) {
        return res.status(400).json({
          message: `Missing required image: ${img}`,
          required: requiredImages,
        });
      }
    }

    // Validate links exist in request body
    const requiredLinks = ["link1", "link2", "link3"];
    for (const link of requiredLinks) {
      if (!req.body[link]) {
        return res.status(400).json({
          message: `Missing required link: ${link}`,
          required: requiredLinks,
        });
      }
    }

    // Process images
    const imageData = await Promise.all(
      requiredImages.map(async (key, index) => {
        const file = req.files[key][0];

        // Basic file validation
        if (!file.mimetype.startsWith("image/")) {
          throw new Error(`File ${key} is not an image`);
        }

        // Upload to Cloudinary
        const uploadedImage = await uploadCloudinary(file.path);

        // Clean up temporary file
        try {
          await fs.promises.unlink(file.path);
        } catch (cleanupError) {
          console.error(`Error cleaning up file ${file.path}:`, cleanupError);
        }

        return {
          url: uploadedImage.url,
          link: req.body[requiredLinks[index]],
        };
      })
    );

    // Clear existing ads and save new ones
    await Adv.deleteMany({});
    const newAdv = new Adv({ img: imageData });
    await newAdv.save();

    res.status(201).json({
      success: true,
      message: "Advertisements updated successfully",
      data: newAdv,
    });
  } catch (error) {
    console.error("Error in addAdv:", error);

    // Specific error messages for different cases
    let status = 500;
    let message = "Failed to process advertisements";

    if (error.message.includes("not an image")) {
      status = 400;
      message = error.message;
    } else if (error.name === "ValidationError") {
      status = 400;
      message = "Invalid advertisement data";
    }

    res.status(status).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Controller to fetch all advertisements
export const getAdvs = async (req, res) => {
  try {
    const advs = await Adv.find().sort({ createdAt: -1 }); // Get newest first
    if (!advs || advs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No advertisements found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: advs.length,
      data: advs,
    });
  } catch (error) {
    console.error("Error fetching advertisements:", error);

    // Handle specific Mongoose errors
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch advertisements",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Controller to delete an advertisement
// export const deleteAdv = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const adv = await Adv.findById(id);

//     if (!adv) {
//       return res.status(404).json({ message: "Advertisement not found" });
//     }

//     await Adv.findByIdAndDelete(id);
//     res.status(200).json({ message: "Advertisement deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete advertisement" });
//   }
// };

// export const displayYoutubeLink = async (req, res) => {
//   try {
//     const youtubeLinks = await YouTube.find();
//     res.status(200).json(youtubeLinks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete advertisement" });
//   }
// };
