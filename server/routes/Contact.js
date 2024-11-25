import express from "express";
import { contactUsController } from "../controllers/contact-us.js";

const router = express.Router();

router.post("/contact", contactUsController);

export default router;
