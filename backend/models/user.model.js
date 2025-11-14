import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "owner", "delivery_boy"),
      allowNull: false,
      defaultValue: "user",
    },
    resetOtp: {
      type: DataTypes.STRING,
    },
    isOTPVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    otpExpire: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

export default user;
