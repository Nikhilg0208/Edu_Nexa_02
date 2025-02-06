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
