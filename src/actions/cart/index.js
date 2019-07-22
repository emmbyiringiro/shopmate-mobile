import {
  // Generate cart  ID types
  GENERATE_CART_ID_START,
  GENERATE_CART_ID_SUCCESS,
  GENERATE_CART_ID_FAILURE,
  // Add item to cart types
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  // Get product(s) InCart
  GET_PRODUCT_INCART_START,
  GET_PRODUCT_INCART_SUCCESS,
  GET_PRODUCT_INCART_FAILURE,
  // Remove product inCart
  REMOVE_PRODUCT_INCART_START,
  REMOVE_PRODUCT_INCART_SUCCESS,
  REMOVE_PRODUCT_INCART_FAILURE,
  // Update products inCart
  UPDATE_PRODUCT_INCART_START,
  UPDATE_PRODUCT_INCART_SUCCESS,
  UPDATE_PRODUCT_INCART_FAILURE
} from "./types";

import axios from "axios";
import { API_URL, SHOPMATE_CART_ID } from "../../constants";
import { AsyncStorage } from "react-native";

export const generateCartId = () => async dispatch => {
  dispatch({ type: GENERATE_CART_ID_START });

  try {
    const { data } = await axios.get(
      `${API_URL}/shoppingcart/generateUniqueId`
    );

    dispatch({ type: GENERATE_CART_ID_SUCCESS, payload: data.cart_id });
    await AsyncStorage.setItem(SHOPMATE_CART_ID, `${data.cart_id}`);
  } catch ({ response }) {
    console.log(response.data);
    dispatch({
      type: GENERATE_CART_ID_FAILURE,
      errorMessage: response
    });
  }
};

export const getProductInCart = cartId => async dispatch => {
  dispatch({ type: GET_PRODUCT_INCART_START, isFetching: true });

  try {
    const { data } = await axios.get(`${API_URL}/shoppingcart/${cartId}`);

    dispatch({
      type: GET_PRODUCT_INCART_SUCCESS,
      result: data,
      isFetching: false
    });
  } catch ({ response }) {
    dispatch({
      type: GET_PRODUCT_INCART_FAILURE,
      isFetching: false,
      fetchError: true,
      errorMessage: response
    });
  }
};

export const addToCart = ({
  cart_id,
  product_id,
  attributes
}) => async dispatch => {
  dispatch({ type: ADD_TO_CART_START, isAddingToCart: true });

  try {
    const response = await fetch(
      "https://mobilebackend.turing.com/shoppingcart/add",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart_id, product_id, attributes })
      }
    );
    const data = await response.json();

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      result: data,
      isAddingToCart: false
    });
  } catch ({ response }) {
    dispatch({
      type: ADD_TO_CART_FAILURE,
      isAddingToCart: false,
      addToCartError: true,
      errorMessage: response
    });
    console.log(response);
  }
};

export const removeProductInCart = (itemId, cartId) => async dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_INCART_START,
    isRemovingToCart: true,
    removeToCartError: false
  });

  try {
    // Remove product inCart
    const removeProductInCart = await axios.delete(
      `${API_URL}/shoppingcart/removeProduct/${itemId}`
    );
    // Get new products InCart after remove product
    const getProductInCart = await axios.get(
      `${API_URL}/shoppingcart/${cartId}`
    );
    // Request both request simultaneously
    const combinedRequest = await axios.all([
      removeProductInCart,
      getProductInCart
    ]);
    let result = combinedRequest[1].data;

    dispatch({
      type: REMOVE_PRODUCT_INCART_SUCCESS,
      result,
      isRemovingToCart: false
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_INCART_FAILURE,
      isRemovingToCart: false,
      removeToCartError: true,
      errorMessage: error.response
    });
  }
};

export const updateProductInCart = (itemId, quantity) => async dispatch => {
  dispatch({ type: UPDATE_PRODUCT_INCART_START, isUpdating: true });

  try {
    const { data } = await axios.put(
      `${API_URL}/shoppingcart/update/${itemId}`,
      { quantity }
    );

    dispatch({
      type: UPDATE_PRODUCT_INCART_SUCCESS,
      result: data,
      isUpdating: false
    });
    console.log(data);
  } catch ({ response }) {
    dispatch({
      type: UPDATE_PRODUCT_INCART_FAILURE,
      isUpdating: false,
      updateProductError: true,
      errorMessage: response
    });
  }
};
