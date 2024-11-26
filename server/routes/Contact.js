import express from "express";
import { contactUsController } from "../controllers/contact-us.js";

const contactUsRoute = express.Router();

contactUsRoute.post("/contact", contactUsController);

export default contactUsRoute;
