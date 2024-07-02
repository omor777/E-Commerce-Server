import express from "express";
import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/product.js";
const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/products", productRoutes);

export default router;
