import {
  FETCH_PRODUCT_REVIEWS_START,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
  FETCH_PRODUCT_REVIEWS_FAILURE
} from "../../actions/reviews/types";

const initialStates = {
  items: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const reviews = (state = initialStates, action) => {
  switch (action.type) {
    /* ----------------------- */
    /* Fetch reviews actions */
    /* ---------------------- */
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
        errorMessage: action.errorMessage
      };

    default:
      return state;
  }
};
