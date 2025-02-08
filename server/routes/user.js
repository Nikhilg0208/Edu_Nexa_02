import express from "express";

import { auth, isAdmin } from "../middleware/auth.js";

import { deleteUser, getAllUsers } from "../controllers/user.js";

const userRoutes = express.Router();

userRoutes.get("/all-users", auth, isAdmin, getAllUsers);
userRoutes.delete("/:userId", auth, isAdmin, deleteUser);

export default userRoutes;
