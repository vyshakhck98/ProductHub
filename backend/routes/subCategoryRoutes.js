const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSubCategory,
  getSubCategories,
} = require("../controllers/subCategoryController");

router.post("/", protect, createSubCategory);

router.get("/", getSubCategories);

module.exports = router;
