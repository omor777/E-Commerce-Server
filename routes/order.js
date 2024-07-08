import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  placeOrderController,
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
} from "../controller/order.js";
const router = express.Router();

router.post("/initiate", authenticate, placeOrderController);
router.post("/success", paymentSuccessController);
router.post("/fail", paymentFailController);
router.post("/cancel", paymentCancelController);

export default router;
