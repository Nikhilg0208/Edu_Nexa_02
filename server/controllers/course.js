import mongoose from "mongoose";
import { redis } from "../config/redis.js";
import { Category } from "../models/Category.js";
import { Course } from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Section } from "../models/Section.js";
import { SubSection } from "../models/Subsection.js";
import { User } from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";

// Function to create a new course
export const createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    await Promise.all([redis.del("allcourses"), redis.del("categories")]);

    res.status(200).json({
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Edit Course Details
export const editCourse = async (req, res) => {
  try {
    const { courseId, ...updates } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      updates.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    if (updates.tag) updates.tag = JSON.parse(updates.tag);
    if (updates.instructions)
      updates.instructions = JSON.parse(updates.instructions);

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updates },
      { new: true }
    )
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    await Promise.all([redis.del("allcourses"), redis.del("categories")]);

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get Course List
export const getAllCourses = async (req, res) => {
  try {
    const cachedData = await redis.get("allcourses");

    if (cachedData) {
      return res.status(200).json({
        data: JSON.parse(cachedData),
      });
    }

    const allCourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    await redis.set("allcourses", JSON.stringify(allCourses), "EX", 604800);

    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Can't Fetch Course Data`,
      success: false,
      error: error.message,
    });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getFullCourseDetails = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
      $or: [{ studentsEnroled: userId }, { instructor: userId }],
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseDetails) {
      return res.status(400).json({
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get a list of Course for a given Instructor
export const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

// Delete the Course
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    await User.updateMany(
      { _id: { $in: course.studentsEnroled } },
      { $pull: { courses: courseId } }
    );

    // Delete related Course Progress, Ratings, and Reviews
    await Promise.all([
      CourseProgress.deleteMany({ courseID: courseId }),
      RatingAndReview.deleteMany({ course: courseId }),
      Category.findByIdAndUpdate(course.category, {
        $pull: { courses: courseId },
      }),
    ]);

    // Delete sections and their sub-sections efficiently
    const sections = await Section.find({ _id: { $in: course.courseContent } });

    const subSectionIds = sections.flatMap((section) => section.subSection);
    await Promise.all([
      SubSection.deleteMany({ _id: { $in: subSectionIds } }),
      Section.deleteMany({ _id: { $in: course.courseContent } }),
    ]);

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    // Clear Redis cache
    await Promise.all([redis.del("allcourses"), redis.del("categories")]);

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllFullCourseDetails = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      const categoryData = await Category.findOne({ name: category });
      if (categoryData?._id) {
        filter.category = categoryData._id;
      }
    }

    const courses = await Course.find(filter)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
        select: "-password -courseProgress -image",
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path: "ratingAndReviews",
        select: "rating",
      })
      .exec();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    const courseDetails = courses.map((course) => {
      let totalDurationInSeconds = 0;
      let totalRatings = 0;
      let totalReviewCount = course.ratingAndReviews.length;
      let totalStudentsEnrolled = course.studentsEnroled.length;

      // 🔹 Modify `courseContent` to include section durations
      const updatedCourseContent = course.courseContent.map((section) => {
        let sectionDurationInSeconds = 0;

        section.subSection.forEach((subSection) => {
          const timeDurationInSeconds =
            parseFloat(subSection.timeDuration) || 0;
          sectionDurationInSeconds += timeDurationInSeconds;
          totalDurationInSeconds += timeDurationInSeconds;
        });

        return {
          ...section.toObject(), // Convert Mongoose document to plain object
          totalDuration: convertSecondsToDuration(sectionDurationInSeconds),
        };
      });

      if (totalReviewCount > 0) {
        totalRatings = course.ratingAndReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
      }
      const averageRating =
        totalReviewCount > 0 ? totalRatings / totalReviewCount : 0;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        instructor: course.instructor,
        whatYouWillLearn: course.whatYouWillLearn,
        courseContent: updatedCourseContent,
        price: course.price,
        thumbnail: course.thumbnail,
        tag: course.tag,
        category: course.category,
        instructions: course.instructions,
        status: course.status,
        createdAt: course.createdAt,
        totalDuration: convertSecondsToDuration(totalDurationInSeconds),
        totalStudentsEnrolled,
        totalReviewCount,
        averageRating: averageRating.toFixed(2),
      };
    });

    return res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
