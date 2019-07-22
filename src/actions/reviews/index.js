import {
  FETCH_PRODUCT_REVIEWS_START,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE
} from "./types";

// Fetch product reviews
export const getProductReviews = id => async dispatch => {
  dispatch({ type: FETCH_PRODUCT_REVIEWS_START, isFetching: true });
  try {
    const response = await fetch(
      `https://backendapi.turing.com/products/${id}/reviews`
    );
    const data = await response.json();

    dispatch({
      type: FETCH_PRODUCT_REVIEWS_SUCCESS,
      payload: data,
      isFetching: false,
      fetchError: false
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PRODUCT_REVIEWS_FAILURE,
      fetchError: true,
      isFetching: false,
      errorMessage: error.message
    });
  }
};