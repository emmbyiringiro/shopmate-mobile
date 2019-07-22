import axios from "axios";
import {
  // Fetch product actions types
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  TOGGLE_INCART,
  //Fetch product reviews action types
  FETCH_PRODUCT_REVIEWS_START,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE,
  // Product search action types
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE
} from "./types";
import store from "./../../store";
import { API_URL } from "./../../constants";

export const getProducts = (
  requestUrl,
  { page, limit, description_length }
) => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_START, isFetching: true });
  try {
    const { data, request } = await axios.get(`${API_URL}${requestUrl}`, {
      params: { page, limit, description_length }
    });

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data.rows,
      isFetching: false,
      fetchError: false
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      fetchError: true,
      isFetching: false,
      errorMessage: error
    });

    console.log(error);
  }
};

// Search products by query...
export const searchProducts = ({ search }) => async dispatch => {
  const ENDPOINT_URL = `${API_URL}/products/search?query_string=${search}`;

  dispatch({ type: SEARCH_PRODUCTS_START, isFetching: true });
  try {
    const { data } = await axios.get(`${ENDPOINT_URL}`);

    dispatch({
      type: SEARCH_PRODUCTS_SUCCESS,
      payload: data.rows,
      isFetching: false,
      fetchError: false
    });
  } catch (err) {
    dispatch({
      type: SEARCH_PRODUCTS_FAILURE,
      fetchError: true,
      isFetching: false
    });
  }
};

// Toggle add to cart "ON/OFF"
export const toggleInCart = id => {
  const { products, cart } = store.getState();
  let tempProducts = [...products];
  let tempCart = [...cart];

  const product = tempProducts.find(product => product.product_id === id);
  const inCart = !product.inCart;
  product.inCart = inCart;

  tempCart = tempCart.filter(product => product.inCart === true);

  return { type: TOGGLE_INCART, tempProducts, tempCart };
};
