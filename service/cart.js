import Cart from "../models/cart.models.js";
import { findProductById } from "./product.js";

const addProductToCart = async ({
  userId,
  productId,
  product_name,
  quantity,
}) => {
  const product = await findProductById("_id", productId);
  if (!product) {
    throw error("Product is not available", 404);
  }

  let cartProduct;
  cartProduct = await Cart.findOne({
    user: userId,
  });

  if (cartProduct) {
    const existingItemIndex = cartProduct.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cartProduct.items[existingItemIndex].quantity += quantity;
    } else {
      cartProduct.items.push({
        product: productId,
        product_name,
        quantity,
      });
    }
  } else {
    cartProduct = new Cart({
      user: req.user._id,
      items: [
        {
          product: productId,
          product_name,
          quantity,
        },
      ],
    });
  }
  await cartProduct.save();

  return cartProduct;
};

export { addProductToCart };
