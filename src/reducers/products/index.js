import {
  //Fetch Products
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,

  //Search Products,
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE
} from "../../actions/products/types";

const initialStates = {
  items: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const products = (state = initialStates, action) => {
  switch (action.type) {
    /* ----------------------- */
    /* Fetch products actions */
    /* ---------------------- */
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        errorMessage: action.errorMessage
      };

    /* ------------------------ */
    /* Search products actions */
    /* -----------------------*/

    case SEARCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case SEARCH_PRODUCTS_FAILURE:
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
