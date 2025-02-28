import { Category } from "../models/Category.js";
import { Course } from "../models/Course.js";
import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";

export const getDashboardDetails = async (req, res) => {
  try {
    const [
      genderCounts,
      allCategory,
      allCourses,
      allUsers,
      categoryWiseCourseCount,
    ] = await Promise.all([
      Profile.aggregate([
        { $match: { gender: { $in: ["Male", "Female"] } } },
        { $group: { _id: "$gender", count: { $sum: 1 } } },
      ]),
      Category.find({}, { _id: 1, name: 1 }),
      Course.find({}, { studentsEnroled: 1, price: 1, createdAt: 1 }),
      User.find({ accountType: { $ne: "Admin" } }, { createdAt: 1 }),
      Course.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
    ]);

    const usersCount = allUsers.length;
    const TotalCourses = allCourses.length;
    let monthlyRevenue = {};

    const { TotalRevenue, TotalTransaction } = allCourses.reduce(
      (acc, course) => {
        course.studentsEnroled.forEach((student) => {
          const enrollmentDate = new Date(student.enrolledAt);
          const monthYear = `${enrollmentDate.getFullYear()}-${(
            enrollmentDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}`;

          monthlyRevenue[monthYear] =
            (monthlyRevenue[monthYear] || 0) + course.price;

          acc.TotalRevenue += course.price;
          acc.TotalTransaction += 1;
        });

        return acc;
      },
      { TotalRevenue: 0, TotalTransaction: 0 }
    );

    // Ensure all previous months exist with 0 if no transactions
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    for (let i = 1; i <= currentMonth; i++) {
      const monthYear = `${currentYear}-${i.toString().padStart(2, "0")}`;
      if (!monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] = 0;
      }
    }

    // Sort monthly revenue by date
    const sortedMonthlyRevenue = Object.entries(monthlyRevenue)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([month, revenue]) => ({ month, revenue }));

    // Calculate total courses by category
    const totalCourses = categoryWiseCourseCount.reduce(
      (sum, cat) => sum + cat.count,
      0
    );

    // Calculate category percentage
    const cateWithCoursePercentage = allCategory.map((category) => {
      const matchedCategory = categoryWiseCourseCount.find(
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

    // **Fix Previous Month Calculation**
    let previousYear = currentYear;
    let previousMonth = currentMonth - 1;

    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear -= 1;
    }

    const currentMonthStr = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}`;
    const previousMonthStr = `${previousYear}-${previousMonth
      .toString()
      .padStart(2, "0")}`;

    let currentMonthUsers = 0;
    let previousMonthUsers = 0;

    allUsers.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const userMonthYear = `${createdAt.getFullYear()}-${(
        createdAt.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      if (userMonthYear === currentMonthStr) {
        currentMonthUsers++;
      } else if (userMonthYear === previousMonthStr) {
        previousMonthUsers++;
      }
    });

    let currentMonthCourses = 0;
    let previousMonthCourses = 0;
    let currentMonthRevenue = 0;
    let previousMonthRevenue = 0;
    let currentMonthTransaction = 0;
    let previousMonthTransaction = 0;

    allCourses.forEach((course) => {
      const createdAt = new Date(course.createdAt);
      const courseMonthYear = `${createdAt.getFullYear()}-${(
        createdAt.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      if (courseMonthYear === currentMonthStr) {
        currentMonthCourses++;
      } else if (courseMonthYear === previousMonthStr) {
        previousMonthCourses++;
      }

      course.studentsEnroled.forEach((student) => {
        const enrolledAt = new Date(student.enrolledAt);
        const enrolledMonthYear = `${enrolledAt.getFullYear()}-${(
          enrolledAt.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;

        if (enrolledMonthYear === currentMonthStr) {
          currentMonthTransaction++;
          currentMonthRevenue += course.price;
        } else if (enrolledMonthYear === previousMonthStr) {
          previousMonthTransaction++;
          previousMonthRevenue += course.price;
        }
      });
    });

    const userGrowthPercentage = calculateGrowthPercentage(
      currentMonthUsers,
      previousMonthUsers
    );

    const courseGrowthPercentage = calculateGrowthPercentage(
      currentMonthCourses,
      previousMonthCourses
    );

    const revenueGrowthPercentage = calculateGrowthPercentage(
      currentMonthRevenue,
      previousMonthRevenue
    );

    const transactionGrowthPercentage = calculateGrowthPercentage(
      currentMonthTransaction,
      previousMonthTransaction
    );

    const result = {
      TotalRevenue,
      usersCount,
      TotalTransaction,
      TotalCourses,
      genderCounts,
      cateWithCoursePercentage,
      monthlyRevenue: sortedMonthlyRevenue,
      userGrowthPercentage,
      courseGrowthPercentage,
      revenueGrowthPercentage,
      transactionGrowthPercentage,
    };

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// **Fix: Ensure function is defined before use**
const calculateGrowthPercentage = (current, previous) => {
  if (previous > 0) {
    return (((current - previous) / previous) * 100).toFixed(0);
  } else if (current > 0) {
    return 100;
  }
  return 0;
};
