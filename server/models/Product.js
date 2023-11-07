import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    requred: true,
  },
  description: {
    type: String,
    required: true
  }
});

const Product = model('Product', productSchema);

export default Product;
