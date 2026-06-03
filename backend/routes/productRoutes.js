const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

router.post("/", protect, upload.array("images", 10), createProduct);

router.get("/", getProducts);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

router.get("/:id", getProductById);

module.exports = router;
