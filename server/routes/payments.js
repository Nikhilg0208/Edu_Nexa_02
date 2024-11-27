import express from "express";
import { capturePayment } from "../controllers/payments.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/capturePayment", capturePayment);

// router.post("/verifySignature", verifySignature)

export default paymentRoutes;
