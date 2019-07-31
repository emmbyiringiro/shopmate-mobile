import { combineReducers } from "redux";
import { products } from "./products";
import { departments } from "./../reducers/departments";
import { cartId, addToCart, removeToCart, updateProductInCart } from "./cart";
import { reducer as formReducer } from "redux-form";
import { loggedIn } from "./services";
import { shippingRegions, shippingRegionId } from "./shipping-regions";
import { cart } from "./cart";
import { reviews } from "./reviews";
import { productAttributes } from "./attributes";
import { taxes } from "./tax";
import { order } from "./order";

import { fetchError, isFetching, isUserSearching, customer } from "./services";
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
  form: formReducer,
  loggedIn,
  fetchError,
  isFetching,
  isUserSearching,
  taxes,
  shippingRegionId,
  order,
  customer
});
