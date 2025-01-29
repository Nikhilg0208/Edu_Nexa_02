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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category id is required",
      });
    }

    const CategorysDetails = await Category.findById({
      _id: id,
    });

    if (!CategorysDetails) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    if (CategorysDetails.courses.length > 0) {
      return res.status(400).json({
        message: "this category having courses",
      });
    }
    await redis.del("categories");

    await CategorysDetails.deleteOne();

    return res.status(200).json({
      message: "Categorys deleted Successfully",
      data: CategorysDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Category ID from request parameters
    const { name, description } = req.body; // Updated name and description from request body

    // Validate category ID
    if (!id) {
      return res.status(400).json({
        message: "Category ID is required",
      });
    }

    if (!name && !description) {
      return res.status(400).json({
        message:
          "At least one field (name or description) is required to update the category.",
      });
    }

    // Find category by ID
    const categoryDetails = await Category.findById(id);

    if (!categoryDetails) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Check if the category has associated courses
    if (categoryDetails.courses.length > 0) {
      return res.status(400).json({
        message: "This category has associated courses and cannot be updated.",
      });
    }

    // Update the category details
    if (name) categoryDetails.name = name;
    if (description) categoryDetails.description = description;

    // Save the updated category
    await categoryDetails.save();

    // Clear the cache
    await redis.del("categories");

    return res.status(200).json({
      message: "Category updated successfully",
      data: categoryDetails,
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
