import express from "express";
import { getAllPics } from "../controllers/picsController.js";

export const picsRouter = express.Router();

picsRouter.get("/", getAllPics);