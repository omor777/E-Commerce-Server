import Product from "../models/product.models.js";

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

export { createProductController };
