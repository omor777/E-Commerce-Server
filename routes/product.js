import express from "express";
import {
  createProductController,
  getAllProductController,
  updateProductController,
} from "../controller/product.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.get("/", authenticate, getAllProductController);
router.post("/", authenticate, createProductController);
router.patch("/:productId", authenticate, updateProductController);
router.delete("/", () => {});

export default router;
