import { Category } from "../models/Category.js";
import { redis } from "../config/redis.js";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name?.trim() || !description?.trim()) {
      return res.status(400).json({
        message: "Name and description are required and cannot be empty",
      });
    }

    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });

    await redis.del("categories");

    return res.status(200).json({
      message: "Categorys Created Successfully",
      data: CategorysDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const showAllCategories = async (req, res) => {
  try {
    const allCategoriesFromRedis = await redis.get("categories");

    if (allCategoriesFromRedis) {
      const parsedCategories = JSON.parse(allCategoriesFromRedis);

      return res.status(200).json({
        data: parsedCategories,
      });
    }
    const allCategories = await Category.find();

    await redis.set("categories", JSON.stringify(allCategories), "EX", 604800);

    res.status(200).json({
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    // Handle the case when the category is not found
    if (!selectedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    const len = categoriesExceptSelected.length;

    let differentCategory = null;
    if (len > 0) {
      differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(len)]._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
