const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const wishlistRoutes = require("./routes/wishlistRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// Middleware first
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Routes after middleware
app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/subcategories", subCategoryRoutes);

app.use("/api/products", productRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/wishlist", wishlistRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
