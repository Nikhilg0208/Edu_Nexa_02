import express from "express";

import { auth, isAdmin } from "../middleware/auth.js";

import { getAllUsers } from "../controllers/user.js";

const userRoutes = express.Router();

userRoutes.get("/all-users", auth, isAdmin, getAllUsers);

export default userRoutes;
