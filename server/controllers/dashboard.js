import { Category } from "../models/Category.js";
import { Course } from "../models/Course.js";
import { Profile } from "../models/Profile.js";

export const getDashboardDetails = async (req, res) => {
  try {
    const genderCounts = await Profile.aggregate([
      { $match: { gender: { $in: ["Male", "Female"] } } },
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    const allCategory = await Category.find({}, { _id: 1, name: 1 });

    const allCategoryCourseCount = await Course.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const totalCourses = allCategoryCourseCount.reduce(
      (sum, cat) => sum + cat.count,
      0
    );

    const cateWithCoursePercentage = allCategory.map((category) => {
      const matchedCategory = allCategoryCourseCount.find(
        (c) => String(c._id) === String(category._id)
      );

      const courseCount = matchedCategory ? matchedCategory.count : 0;
      const percentage =
        totalCourses > 0 ? Math.round((courseCount / totalCourses) * 100) : 0;

      return {
        category: category.name,
        percentage,
      };
    });

    const result = {
      genderCounts,
      cateWithCoursePercentage,
    };

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
