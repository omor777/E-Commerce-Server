import express from "express";
import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/product.js";
import cartRoutes from "./cart.js";
import orderRoutes from "./order.js";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/products", productRoutes);
router.use("/api/v1/cart", cartRoutes);
router.use("/api/v1/payment", orderRoutes);

export default router;
