import express from "express";
import { upload } from "../utils/multer.js";
import { uploadProfilePic } from "../controllers/profileController.js";

export const profileRouter = express.Router();

profileRouter.post("/", upload.single("profile_pic"), uploadProfilePic);