import { Schema, model } from "mongoose";

// const categorySchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//   },
// });

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    regular_price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating_count: {
      type: Number,
    },
    num_reviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "private", "publish"],
      default: "publish",
    },
    on_sale: {
      type: Boolean,
      // read only
      default: false,
    },
    purchaseable: {
      type: Boolean,
      // read only
      default: true,
    },
    total_sales: {
      type: Number,
      default: 0,
    },
    virtual: {
      type: Boolean,
      default: false,
    },
    manage_stock: {
      type: Boolean,
      default: false,
    },
    stock_quantity: {
      type: Number,
    },
    stock_status: {
      type: String,
      enum: ["in stock", "out of stock"],
      default: "in stock",
    },
    related_ids: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    upsell_ids: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    grouped_products: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
