import { placeOrder } from "../service/order.js";

const placeOrderController = async (req, res, next) => {
  const { products, currency, customerInfo } = req.body;
  try {
    const orderProducts = await placeOrder({
      currency,
      customerInfo,
      products,
      userId: req.user._id,
    });
    res.status(201).json(orderProducts);
  } catch (e) {
    next(e);
  }
};

const paymentSuccessController = async (req, res, next) => {
  console.log("success----------------------");
  console.log(req.body);
};
const paymentFailController = async (req, res, next) => {
  console.log("fail----------------------");
  console.log(req.body);
};
const paymentCancelController = (req, res, next) => {
  console.log("cancel----------------------");
  console.log(req.body);
};

export {
  placeOrderController,
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
