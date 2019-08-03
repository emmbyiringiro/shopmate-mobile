import {
  FETCH_DEPARTMENTS_START,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from "./../../actions/departments/types";

const intitalDepartmentState = {
  items: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const departments = (state = intitalDepartmentState, action) => {
  switch (action.type) {
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
        error: action.error
      };
    default:
      return state;
  }
};
