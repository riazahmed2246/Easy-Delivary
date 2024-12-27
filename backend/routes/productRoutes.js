const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, retailerOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

// Retailer-only routes
router.post("/", protect, retailerOnly, createProduct);
router.put("/:id", protect, retailerOnly, updateProduct);
router.delete("/:id", protect, retailerOnly, deleteProduct);

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
