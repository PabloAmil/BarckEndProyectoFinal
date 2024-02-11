import mongoose from "mongoose";

const productsCollection = "products";

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  }
})

const productsModel = mongoose.model(productsCollection, ProductsSchema);

export default productsModel;

