import Action from "../models/Action.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";

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
    const { id } = req.params;
    const isAction = await Action.findByIdAndDelete(id);
    if (!isAction) {
      return res.status(404).json({ message: "file not found" });
    }
    res.status(200).json({ message: error.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
