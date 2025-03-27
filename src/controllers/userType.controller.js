import UserType from "../models/UserType.model.js";
import Action from "../models/Action.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";
// import { parse } from "dotenv";
// Show All Cards
export const userType = async (req, res) => {
  try {
    const userType = await UserType.find();
    res.status(200).json(userType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUserType = async (req, res) => {
  try {
    console.log(req.file, "file uplode");

    const { usertype } = req.body;
    const imageUplode = await uploadCloudinary(req.file.path);
    console.log("imageUplode", imageUplode);

    console.log(req.body);
    // Check if the user type already exists
    const existingUserType = await UserType.findOne({ usertype });
    if (existingUserType) {
      return res.status(400).json({ message: "Type name already exists" });
    }

    // Create new user type
    const newUserType = new UserType({ usertype, img: imageUplode.url });
    await newUserType.save();

    console.log(newUserType, "newUserType");

    res.status(201).json(newUserType); // ✅ Return the saved user type
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserType = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id");

    const { usertype } = req.body;
    console.log(usertype, "userType");

    const isUserType = await UserType.findByIdAndUpdate(
      id,
      { usertype },
      { new: true }
    );
    if (!isUserType) {
      console.log(isUserType, "isUserType");

      return res.status(404).json({ message: "file not found" });
    }
    res.status(200).json({ message: "updated sucessafully", isUserType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserType = async (req, res) => {
  try {
    console.log(req.params, "kkk");

    const { id } = req.params;
    console.log(`Attempting to delete UserType with ID: ${id}`);
    const deletedUserType = await UserType.findByIdAndDelete(id);
    if (!deletedUserType) {
      return res.status(404).json({ message: "UserType not found" });
    }
    res.status(200).json({ message: "ID deleted successfully" });
  } catch (error) {
    console.error("Error deleting UserType:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// export const action = async (req, res) => {
//   try {
//     const { usertype } = req.query; // Extract from query instead of params
//     console.log(usertype, "query");

//     // If usertype is provided, filter; otherwise, get all actions
//     const query = usertype;
//     // ? { usertype } : {};

//     const actions = await Action.find(query);
//     console.log(actions, "actions");

//     if (!actions.length) {
//       return res.status(404).json({ message: "No actions found" });
//     }

//     res.status(200).json(actions);
//   } catch (error) {
//     console.error("Error fetching actions:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Add new action
export const action = async (req, res) => {
  console.log(req.params, "usertype query");

  try {
    const { usertype } = req.query; // Extract usertype from query params
    console.log("Usertype Query:", req.query);

    // If usertype is provided, filter; otherwise, return all actions
    const query = usertype;
    console.log(query, "query");

    const actions = await Action.find(query);
    console.log("Filtered Actions:", actions);

    if (!actions.length) {
      return res
        .status(404)
        .json({ message: "No actions found for this usertype" });
    }

    res.status(200).json(actions);
  } catch (error) {
    console.error("Error fetching actions:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addAction = async (req, res) => {
  try {
    // console.log("Received request file:", req.file);
    const imageUplode = await uploadCloudinary(req.file.path);
    // console.log("imageUplode", imageUplode);
    let data = req.body; // Accepting both object & array

    // If a single object is received, convert it into an array
    if (!Array.isArray(data)) {
      data = [data];
    }
    // console.log(data.actions, "data");
    data.map((item) => {
      item.action = item.actions.action;
      item.link = item.actions.link;
      delete item.actions;
    });
    console.log(data, "data 0 ");

    // Validate the data before insertion
    if (!data.every((item) => item.usertype && item.action && item.link)) {
      return res
        .status(400)
        .json({ message: "Missing required fields (usertype, action, link)." });
    }

    // Insert into DB
    const newActions = await Action.insertMany(data);

    console.log("Inserted Actions:", newActions);

    res
      .status(201)
      .json({ message: "Actions added successfully", actions: newActions });
  } catch (error) {
    console.error("Error adding action:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAction = async (req, res) => {
  try {
    const id = req.params;
    const { usertype, language, img, action, link } = req.body;
    const isAction = await Action.findByIdAndUpdate(id, {
      usertype,
      language,
      img,
      action,
      link,
    });
    if (!isAction) {
      return res.status(404).json({ message: "action not found" });
    }
    res.status(200).json({ message: "updated sucessafully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAction = async (req, res) => {
  try {
    const id = req.params;
    const isAction = await Action.findByIdAndDelete(id);
    if (!isAction) {
      return res.status(404).json({ message: "file not found" });
    }
    res.status(200).json({ message: error.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
