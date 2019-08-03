import {
  FETCH_PRODUCT_ATTRIBUTES_START,
  FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
  FETCH_PRODUCT_ATTRIBUTES_FAILURE
} from "../../actions/attributes/types";

const initialStates = {
  items: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const productAttributes = (state = initialStates, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_ATTRIBUTES_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case FETCH_PRODUCT_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        items: action.items,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_PRODUCT_ATTRIBUTES_FAILURE:
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
