import { v4 as uuidv4 } from "uuid";
import config from "../config/config.js";
import Product from "../models/product.models.js";
import Order from "../models/order.models.js";
import axios from "axios";

const validateRequestBody = (products, currency) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw error("Products must be an array of objects", 400);
  }

  if (!currency || typeof currency !== "string")
    throw error("currency is required and it should be string", 400);
};

const getOrdersIdAndQuantity = (products = []) => {
  const ordersId = products.map((product) => product.productId);

  const ordersQuantity = products.reduce((acc, cur) => {
    acc[cur.name] = cur.quantity;
    return acc;
  }, {});

  return {
    ordersId,
    ordersQuantity,
  };
};

const calculateTotalPrice = ({ matchProducts, ordersQuantity }) => {
  const totalPrice = matchProducts.reduce((acc, cur) => {
    acc += cur.price * ordersQuantity[cur.name];
    return acc;
  }, 0);
  return totalPrice;
};

const prepareOrderItems = ({ matchProducts, ordersQuantity }) => {
  const orderItems = matchProducts.map((item) => {
    return {
      product: item._id,
      name: item.name,
      quantity: ordersQuantity[item.name],
      price: item.price,
    };
  });
  return orderItems;
};

const prepareInitiateData = ({
  customerInfo,
  transactionId,
  totalPrice,
  currency,
  productNames,
}) => {
  return {
    store_id: config.sslcommerz.store_id,
    store_passwd: config.sslcommerz.store_passwd,
    total_amount: totalPrice,
    currency,
    tran_id: transactionId,
    product_category: "mobile",
    success_url: config.successUrl,
    fail_url: config.failUrl,
    cancel_url: config.failUrl,
    emi_option: 0,
    cus_name: customerInfo.name,
    cus_email: customerInfo.email,
    cus_add1: customerInfo.address,
    cus_city: customerInfo.city,
    cus_postcode: customerInfo.postCode,
    cus_country: customerInfo.country,
    cus_phone: customerInfo.phoneNo,
    shipping_method: "NO",
    product_name: productNames.join(","),
    product_profile: "general",
  };
};

// place order service
const placeOrder = async ({ products, currency, customerInfo,userId }) => {
  const transactionId = uuidv4();

  validateRequestBody(products, currency);

  const { ordersId, ordersQuantity } = getOrdersIdAndQuantity(products);

  const productNames = products.map((p) => p.name);

  const matchProducts = await Product.find({ _id: { $in: ordersId } });

  if (!matchProducts.length) throw error("No products found");

  const totalPrice = calculateTotalPrice({ matchProducts, ordersQuantity });

  const orderItems = prepareOrderItems({ matchProducts, ordersQuantity });

  const initiateData = prepareInitiateData({
    currency,
    customerInfo,
    productNames,
    totalPrice,
    transactionId,
  });

  const { data } = await axios({
    method: "POST",
    url: config.sslcommerzUrl,
    data: initiateData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const orderProducts = new Order({
    user: userId,
    orderItems,
    shippingAddress: customerInfo.address,
    itemsPrice: totalPrice,
  });

  await orderProducts.save();

  return orderProducts;
};

export { placeOrder };
