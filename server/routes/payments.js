import express from "express";
import {
  capturePayment,
  sendPaymentSuccessEmail,
} from "../controllers/payments.js";
import { verifyPayment } from "../controllers/payments.js";
import { auth } from "../middleware/auth.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/capturePayment", auth, capturePayment);
paymentRoutes.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);
paymentRoutes.post("/verifyPayment", auth, verifyPayment);

export default paymentRoutes;
