import YouTube from "../models/Youtube.model.js";
export const showMobileYoutubeLinks = async (req, res) => {
  try {
    const allLinks = await YouTube.find({ platform: "mobile" });
    console.log(allLinks);
    res.status(200).json({ links: allLinks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addYoutubeLinks = async (req, res) => {
  try {
    const { YouTubeLink, platform } = req.body;
    const newLink = new YouTube({ YouTubeLink, platform });
    console.log(newLink, "newLink");
    await newLink.save();
    res.status(200).json({ link: newLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const showWebYoutubeLinks = async (req, res) => {
  try {
    const allLinks = await YouTube.find({ platform: "web" });
    console.log(allLinks);
    res.status(200).json({ links: allLinks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
