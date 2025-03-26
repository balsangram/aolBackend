import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import {
  loginCustomer,
  registerCustomer,
} from "../controllers/customer.controller.js";
import {
  addHeadlines,
  displayHeadlines,
} from "../controllers/head.controller.js";
import {
  createCard,
  removeCard,
  showAllCards,
  updateCard,
} from "../controllers/card.controller.js";
import {
  action,
  addAction,
  addUserType,
  userType,
} from "../controllers/user.controller.js";
import {
  addYoutubeLinks,
  showMobileYoutubeLinks,
  showWebYoutubeLinks,
} from "../controllers/youTube.controller.js";
import { addAdv } from "../controllers/adv.controller.js";
const router = express.Router();

// admin functionality
router.post("/adminRegister", registerAdmin);
router.post("/adminLogin", loginAdmin);
// router.patch("/adminUpdayte");
// router.delete("/adminDelete");

// customer functionality
router.post("/userRegister", registerCustomer);
router.post("/userLogin", loginCustomer);
// router.patch("/userUpdate");
// router.delete("/userDelete");

// Headings
router.get("/displayHeading", displayHeadlines);
router.post("/addHeading", addHeadlines);
// router.patch("/updateHEading",);
// router.delete("/deleteHEading",);

//containers
router.get("/showAllCards", showAllCards);
router.post("/createCard", upload.single("img"), createCard);
// router.patch("/updateCard/:id", updateCard);
// router.delete("/removeCard/:id", removeCard);

//user Types
router.get("/userType", userType);
router.post("/addUserType", upload.single("img"), addUserType);

//actions
router.get("/displayAction/:usertype", action);
router.post("/addAction", upload.any(), addAction);

// YouTube Link
router.post("/addYoutubeLinks", addYoutubeLinks);
router.get("/displayMobYoutubeLinks", showMobileYoutubeLinks);
router.get("/displayWebYoutubeLinks", showWebYoutubeLinks);

// Advertising
router.post("/addAdv", upload.any(), addAdv);

export default router;
