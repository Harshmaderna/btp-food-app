import { Sequelize } from "sequelize";

const sequelize = new Sequelize("vingo_fooApp", "root", "", {
  host: "localhost",
  dialect: "mysql",
}); 

try {
  await sequelize.authenticate();
  console.log("✅ MySQL Connection has been established successfully.");
  await sequelize.sync(); // 🔄 Tables auto sync (optional)
  console.log("✅ All models were synchronized successfully.");
} catch (error) {
  console.error("❌ Unable to connect to the database:", error.message); 
}

export default sequelize;
