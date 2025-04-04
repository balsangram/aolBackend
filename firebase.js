import admin from "firebase-admin";
import express from "express";
// import serviceAccount from "../../art-of-living-3d0d9-firebase-adminsdk-fbsvc-56be2a6b5d.json" assert { type: "json" };

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./art-of-living-3d0d9-firebase-adminsdk-fbsvc-56be2a6b5d.json",
    "utf-8"
  )
);

// console.log(serviceAccount);
// console.log(serviceAccount.default);
// // Load Firebase credentials from environment variable

// console.log(serviceAccount, "serviceAccount");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const router = express.Router();

// Send notification to all users
export const sendNotification = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const message = {
      notification: { title, body },
      topic: "global", // Sends to all subscribed users
    };

    // const response = await admin.messaging().send(message);
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);

    res.status(200).json({
      success: true,
      message: "Notification sent to all users",
      response,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Attach function to the router
router.post("/sendNotification", sendNotification);

router.post("/subscribe-topic", async (req, res) => {
  const { token, topic } = req.body;

  if (!token || !topic) {
    return res.status(400).json({ error: "Token and topic are required" });
  }

  try {
    await admin.messaging().subscribeToTopic(token, topic);
    console.log("subscribeToTopic");

    res.json({ success: true, message: `Subscribed to ${topic}` });
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

export default router; // ✅ Corrected Export
