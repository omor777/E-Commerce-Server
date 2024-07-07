import express from "express";
import { addProductToCartController } from "../controller/cart.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate, addProductToCartController);

export default router;
