import express from "express";
import { upload } from "../utils/multer.js";
import { catController } from "../controllers/catController.js";

export const catRouter = express.Router();

catRouter.post("/", upload.array("cat_pics", 3), catController);
