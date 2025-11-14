import user from "../models/user.model.js";

const authController = {
  getCurrentUser: async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID not found" });
      }
      const users = await user.findById(userId).select("-password");
      if (!users) {
        return res.status(400).json({ message: "user not found" });
      }
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: users,
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};

export default authController;
