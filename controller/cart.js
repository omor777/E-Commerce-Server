import { addProductToCart } from "../service/cart.js";
import error from "../utils/error.js";

const addProductToCartController = async (req, res, next) => {
  const { productId, product_name, quantity } = req.body;

  try {
    if (!productId) throw error("ProductId is required", 400);
    if (!product_name) throw error("Product name is required", 400);
    if (!quantity) throw error("Quantity is required", 400);

    const cartProduct = await addProductToCart({
      userId: req.user._id,
      product_name,
      quantity,
      productId,
    });

    res.status(201).json(cartProduct);
  } catch (e) {
    next(e);
  }
};

export { addProductToCartController };
