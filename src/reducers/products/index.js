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

const initialProductsState = {
  items: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const products = (state = initialProductsState, action) => {
  switch (action.type) {
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
        error: action.error
      };

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
        error: action.error
      };

    default:
      return state;
  }
};
