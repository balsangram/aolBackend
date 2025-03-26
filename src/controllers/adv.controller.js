import Adv from "../models/Adv.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";
import YouTube from "../models/Youtube.model.js";
// import fs from "fs";

// Controller to add a new advertisement
export const addAdv = async (req, res) => {
  try {
    console.log(req.file, "advImg ");

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Upload all images to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        return await uploadCloudinary(file.path);
      })
    );
    // Ensure all images uploaded successfully
    if (imageUrls.includes(null)) {
      return res
        .status(500)
        .json({ message: "Failed to upload some images to Cloudinary" });
    }
    const filterUrls = imageUrls.map((images) => {
      return images.url;
    });
    // Save advertisement in the database
    const newAdv = new Adv({
      img: filterUrls, // Store multiple images as an array
    });

    await newAdv.save();

    res.status(201).json({
      message: "Advertisement added successfully",
      data: newAdv,
    });
  } catch (error) {
    console.error("Error adding advertisement:", error);
    res.status(500).json({ message: "Failed to add advertisement" });
  }
};

// Controller to fetch all advertisements
export const getAdvs = async (req, res) => {
  try {
    const advs = await Adv.find();
    res.status(200).json(advs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch advertisements" });
  }
};

// Controller to delete an advertisement
export const deleteAdv = async (req, res) => {
  try {
    const { id } = req.params;
    const adv = await Adv.findById(id);

    if (!adv) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    await Adv.findByIdAndDelete(id);
    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete advertisement" });
  }
};

export const displayYoutubeLink = async (req, res) => {
  try {
    const youtubeLinks = await YouTube.find();
    res.status(200).json(youtubeLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete advertisement" });
  }
};
