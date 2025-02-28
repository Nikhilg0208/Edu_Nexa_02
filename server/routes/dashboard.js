import express from "express";
import { getDashboardDetails } from "../controllers/dashboard.js";
import { auth, isAdmin } from "../middleware/auth.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/", auth, isAdmin, getDashboardDetails);

export default dashboardRoutes;
