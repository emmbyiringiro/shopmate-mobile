import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from "./../../actions/categories/types";

const initialStates = {
  items: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const categories = (state = initialStates, action) => {
  switch (action.type) {
    /* -------------------------- */
    /*  fetch categories actions */
    /* ------------------------- */
    case FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_CATEGORIES_FAILURE:
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
