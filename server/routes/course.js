import express from "express";

import {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
} from "../controllers/course.js";

import {
  categoryPageDetails,
  createCategory,
  deleteCategory,
  showAllCategories,
  updateCategory,
} from "../controllers/category.js";

import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/section.js";

import {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} from "../controllers/sub-section.js";

import {
  createRating,
  getAllRatingReview,
  getAverageRating,
} from "../controllers/rating-review.js";

import { updateCourseProgress } from "../controllers/course-progress.js";

import { auth, isAdmin, isInstructor, isStudent } from "../middleware/auth.js";

const courseRoutes = express.Router();

courseRoutes.post("/createCourse", auth, isInstructor, createCourse);
courseRoutes.post("/editCourse", auth, isInstructor, editCourse);
courseRoutes.post("/addSection", auth, isInstructor, createSection);
courseRoutes.post("/updateSection", auth, isInstructor, updateSection);
courseRoutes.post("/deleteSection", auth, isInstructor, deleteSection);
courseRoutes.post("/updateSubSection", auth, isInstructor, updateSubSection);
courseRoutes.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
courseRoutes.post("/addSubSection", auth, isInstructor, createSubSection);
courseRoutes.get(
  "/getInstructorCourses",
  auth,
  isInstructor,
  getInstructorCourses
);
courseRoutes.get("/getAllCourses", getAllCourses);
courseRoutes.post("/getCourseDetails", getCourseDetails);
courseRoutes.post("/getFullCourseDetails", auth, getFullCourseDetails);
courseRoutes.post(
  "/updateCourseProgress",
  auth,
  isStudent,
  updateCourseProgress
);
courseRoutes.delete("/deleteCourse", auth, isInstructor, deleteCourse);
courseRoutes.post("/createCategory", auth, isAdmin, createCategory);

courseRoutes.get("/showAllCategories", showAllCategories);
courseRoutes.post("/getCategoryPageDetails", categoryPageDetails);

courseRoutes
  .route("/Category/:id")
  .delete(auth, isAdmin, deleteCategory)
  .patch(auth, isAdmin, updateCategory);

courseRoutes.post("/createRating", auth, isStudent, createRating);
courseRoutes.get("/getAverageRating", getAverageRating);
courseRoutes.get("/getReviews", getAllRatingReview);

export default courseRoutes;
