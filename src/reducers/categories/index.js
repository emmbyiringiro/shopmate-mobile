import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from "./../../actions/categories/types";

const initialCategoriesState = {
  items: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
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
        error: action.error
      };
    default:
      return state;
  }
};
