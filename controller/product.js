import Product from "../models/product.models.js";
import error from "../utils/error.js";

const getAllProductController = async (req, res, next) => {
  try {
    // pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const price = req.query.price ? { price: { $lte: req.query.price } } : {};

    const allProducts = await Product.find(price).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(price);

    res.status(200).json({
      success: true,
      count: allProducts.length,
      total: totalProducts,
      page,
      pages: Math.ceil(totalProducts / limit),
      products: allProducts,
    });
  } catch (e) {
    next(e);
  }
};

const createProductController = async (req, res, next) => {
  try {
    const { name, description, price, stock, images } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
    if (price === undefined || price <= 0) {
      return res.status(400).json({ error: "Price should be greater than 0" });
    }
    if (stock === undefined || stock < 0) {
      return res
        .status(400)
        .json({ error: "Stock must be greater than or equal to 0" });
    }
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      images,
    });

    await product.save();

    return res.status(201).json({ message: "Product has been added", product });
  } catch (e) {
    next(e);
  }
};

const updateProductController = async (req, res, next) => {
  const { name, description, price, stock, images } = req.body;
  const { productId } = req.params;

  try {
    const updates = {};

    if (name && name.trim() !== "") {
      updates.name = name;
    }
    if (description && description.trim() !== "") {
      updates.description = description;
    }
    if (price !== undefined && price > 0) {
      updates.price = price;
    }
    if (stock !== undefined && stock >= 0) {
      updates.stock = stock;
    }
    if (Array.isArray(images) && images.length > 0) {
      updates.images = images;
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updates,
      {
        new: true,
      }
    );

    if (!updateProduct) {
      throw error("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updateProduct,
    });
  } catch (e) {
    next(e);
  }
};

export {
  createProductController,
  getAllProductController,
  updateProductController,
};
