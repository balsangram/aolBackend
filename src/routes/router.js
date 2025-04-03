import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import {
  deleteCustomer,
  loginCustomer,
  registerCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";
import {
  addHeadlines,
  deleteHeading,
  displayHeadlines,
  updateHeading,
} from "../controllers/head.controller.js";
import {
  createCard,
  removeCard,
  showAllCards,
  updateCard,
} from "../controllers/card.controller.js";
import {
  addUserType,
  deleteUserType,
  updateUserType,
  userType,
} from "../controllers/userType.controller.js";
import {
  addYoutubeLinks,
  deleteYoutubeLink,
  showMobileYoutubeLinks,
  showWebYoutubeLinks,
  updateYoutubeLink,
} from "../controllers/youTube.controller.js";
import { addAdv, getAdvs } from "../controllers/adv.controller.js";
import UserType from "../models/UserType.model.js";
import {
  action,
  addAction,
  deleteAction,
  updateAction,
} from "../controllers/action.contoller.js";

import { addPopUp, displayPopUp } from "../controllers/popUp.controller.js";
const router = express.Router();

// admin functionality
router.post("/adminRegister", registerAdmin);
router.post("/adminLogin", loginAdmin);
// router.patch("/adminUpdayte");
// router.delete("/adminDelete");

// customer functionality
router.post("/userRegister", registerCustomer);
router.post("/userLogin", loginCustomer);
router.patch("/userUpdate/:id", updateCustomer);
router.delete("/userDelete/:id", deleteCustomer);

// Headings
router.get("/displayHeading", displayHeadlines);
router.post("/addHeading", addHeadlines);
// router.patch("/updateHeading/:id", updateHeading);
router.delete("/deleteHeading/:id", deleteHeading);

//containers
router.get("/showAllCards/:headline", showAllCards);
router.post("/createCard", upload.single("img"), createCard);
router.patch("/updateCard/:id", upload.single("img"), updateCard);
router.delete("/removeCard/:id", removeCard);

//user Types
router.get("/userType", userType);
router.post("/addUserType", upload.single("img"), addUserType);
router.patch("/updateUSerType/:id", updateUserType);
router.delete("/deleteUSerType/:id", deleteUserType);

//actions
router.get("/displayAction/:usertype", action);
router.post("/addAction", upload.any(), addAction);
router.patch("/updateAction/:id", upload.any(), updateAction);
router.delete("/deleteAction/:id", deleteAction);

// YouTube Link
router.post("/addYoutubeLinks", upload.single("thumbnail"), addYoutubeLinks);
router.get("/displayMobYoutubeLinks", showMobileYoutubeLinks);
router.get("/displayWebYoutubeLinks", showWebYoutubeLinks);
router.patch(
  "/updateYoutubeLink/:id",
  upload.single("thumbnail"),
  updateYoutubeLink
);
router.delete("/deleteYoutubeLink/:id", deleteYoutubeLink);

// Advertising
// router.post("/addAdv", upload.array("img", 3), addAdv);
router.post("/addAdv", upload.any(), addAdv);
router.get("/displayAdvertisement", getAdvs);

//pop-up
router.post("/addPopUp", upload.single("img"), addPopUp);
router.get("/displayPopUp", displayPopUp);

//

export default router;
