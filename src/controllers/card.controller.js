import Card from "../models/Card.model.js";
import { uploadCloudinary } from "../utils/cloudnary.js";

// Show All Cards
export const showAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Card
export const createCard = async (req, res) => {
  try {
    console.log(req.file, "card file show");

    const { name, link, headline } = req.body;
    const imageUplode = await uploadCloudinary(req.file.path);
    console.log("imageUplode", imageUplode);

    console.log("req", req.file);

    const existingCard = await Card.findOne({ name });
    if (existingCard) {
      return res.status(400).json({ message: "Card name already exists" });
    }
    const newCard = new Card({ name, link, headline, img: imageUplode.url });
    console.log(newCard, "newcard");

    await newCard.save();
    res.status(201).json({ message: "Card created successfully", newCard });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { name, link },
      { new: true }
    );
    if (!updatedCard)
      return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card updated successfully", updatedCard });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Card
export const removeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
