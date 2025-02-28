import { redis } from "../config/redis.js";
import { Category } from "../models/Category.js";
import { Course } from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Profile } from "../models/Profile.js";
import { RatingAndReview } from "../models/RatingandReview.js";
import { Section } from "../models/Section.js";
import { SubSection } from "../models/Subsection.js";
import { User } from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({
      accountType: { $ne: "Admin" },
    }).populate("additionalDetails");
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "not able to get all users",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let userId;
    if (req.user.role !== "Admin") {
      userId = req.user.id;
    } else {
      userId = req.params.userId;
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await Profile.findByIdAndDelete(user.additionalDetails);
    await CourseProgress.deleteMany({ userId: user._id });

    if (user.accountType === "Instructor") {
      const courses = await Course.find({
        _id: { $in: user.courses },
      });

      for (const course of courses) {
        await CourseProgress.deleteMany({ courseID: course._id });
        await RatingAndReview.deleteMany({ course: course._id });

        for (const sectionId of course.courseContent) {
          const section = await Section.findById(sectionId);
          if (section) {
            await SubSection.deleteMany({ _id: { $in: section.subSection } });
          }
        }

        await Category.updateMany(
          { courses: course._id },
          { $pull: { courses: course._id } }
        );
        await Promise.all([redis.del("allcourses"), redis.del("categories")]);
        await Section.deleteMany({ _id: { $in: course.courseContent } });
        await Course.findByIdAndDelete(course._id);
      }
    } else if (user.accountType === "Student") {
      await Course.updateMany(
        { "studentsEnroled.user": user._id },
        { $pull: { studentsEnroled: { user: user._id } } }
      );

      await RatingAndReview.deleteMany({ user: user._id });
    }

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: "User and all related data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
