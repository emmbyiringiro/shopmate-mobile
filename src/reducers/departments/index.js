import {
  FETCH_DEPARTMENTS_START,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from "./../../actions/departments/types";

const initialStates = {
  items: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const departments = (state = initialStates, action) => {
  switch (action.type) {
    /* -------------------------- */
    /*  fetch department actions */
    /* ------------------------- */
    case FETCH_DEPARTMENTS_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_DEPARTMENTS_FAILURE:
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
