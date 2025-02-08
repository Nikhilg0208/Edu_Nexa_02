import express from "express";
import { auth, isInstructor } from "../middleware/auth.js";
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} from "../controllers/profile.js";

const profileRoutes = express.Router();

profileRoutes.put("/updateProfile", auth, updateProfile);
profileRoutes.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
profileRoutes.get("/getEnrolledCourses", auth, getEnrolledCourses);
profileRoutes.put("/updateDisplayPicture", auth, updateDisplayPicture);
profileRoutes.get(
  "/instructorDashboard",
  auth,
  isInstructor,
  instructorDashboard
);

export default profileRoutes;
