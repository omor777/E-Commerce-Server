import express from "express";
import authRoutes from "../routes/auth.js";
const router = express.Router();

router.use("/api/v1/auth", authRoutes);

export default router;
