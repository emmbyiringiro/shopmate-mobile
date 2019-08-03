import {
  GET_TAX_START,
  GET_TAX_SUCCESS,
  GET_TAX_FAILURE
} from "../../actions/tax/types";

const initialTaxState = {
  result: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const taxes = (state = initialTaxState, action) => {
  switch (action.type) {
    case GET_TAX_START:
      return {
        ...state,

        isFetching: action.isFetching
      };

    case GET_TAX_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GET_TAX_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        fetchError: action.fetchError,
        error: action.error
      };

    default:
      return state;
  }
};
