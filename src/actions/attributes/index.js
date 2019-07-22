import {
  FETCH_PRODUCT_ATTRIBUTES_START,
  FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
  FETCH_PRODUCT_ATTRIBUTES_FAILURE
} from "./types";

import { API_URL } from "../../constants";

export const getProductAttributes = productId => async dispatch => {
  const ENDPOINT_URL = `${API_URL}/attributes/inProduct/${productId}`;

  dispatch({ type: FETCH_PRODUCT_ATTRIBUTES_START, isFetching: true });
  try {
    const response = await fetch(`${ENDPOINT_URL}`);
    const data = await response.json();

    dispatch({
      type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
      items: data,
      isFetching: false,
      fetchError: false
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PRODUCT_ATTRIBUTES_FAILURE,
      fetchError: true,
      isFetching: false,
      errorMessage: error.message
    });
  }
};
