import {
  FETCH_PRODUCT_REVIEWS_START,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE
} from "../../actions/reviews/types";

const initialReviewState = {
  items: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const reviews = (state = initialReviewState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REVIEWS_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case FETCH_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_PRODUCT_REVIEWS_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        error: action.error
      };

    default:
      return state;
  }
};
