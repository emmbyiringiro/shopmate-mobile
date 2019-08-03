import { combineReducers } from "redux";
import { products } from "./products";
import { departments } from "./../reducers/departments";
import { cartId, addToCart, removeToCart, updateProductInCart } from "./cart";
import { reducer as formReducer } from "redux-form";
import { loggedIn } from "./services";
import { shippingRegions, shippingOptions } from "./shipping-regions";
import { cart } from "./cart";
import { reviews } from "./reviews";
import { productAttributes } from "./attributes";
import { taxes } from "./tax";
import { placeOrder, customerOrders, order } from "./order";

import { isUserSearching, customer } from "./services";
import { categories } from "./categories";

export default combineReducers({
  products,
  cart,
  cartId,
  addToCart,
  removeToCart,
  updateProductInCart,
  reviews,
  departments,
  categories,
  productAttributes,
  shippingRegions,
  shippingOptions,
  form: formReducer,
  loggedIn,
  isUserSearching,
  taxes,
  order,
  placeOrder,
  customerOrders,
  customer
});
