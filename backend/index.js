import express from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/db.js"; 
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"; 
import cors from "cors";
import userRouter from "./routes/authCont.route.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/api", authRouter)
app.use("/api", userRouter)
 
app.get("/", (req, res) => {
  res.send("Hello papa g 😎 — Server & DB both running fine!");
});

const PORT = process.env.PORT || 5000;  

 
(async () => {
  try {
    
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");  

    await sequelize.sync();
    console.log("✅ All models synced successfully."); 

    
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    
    console.error("❌ Unable to connect to the database or sync models:", error.message);
  }
})();
