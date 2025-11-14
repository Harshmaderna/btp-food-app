import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return token;
  } catch (error) {
    console.error("❌ JWT Token generation error:", error.message);
  }
};

export default genToken;
