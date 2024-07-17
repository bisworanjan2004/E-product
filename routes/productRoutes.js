const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUserProducts,
} = require("../controllers/productController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create",createProduct);
router.get("/get-all", getAllProducts);
router.get("/get-product/:id",  getProductById);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/get-user-product/:id", getUserProducts);




module.exports = router;
