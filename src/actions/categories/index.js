import {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from "./types";
import { API_URL } from "./../../constants";

export const getCategories = departmentId => async dispatch => {
  const ENDPOINT_URL = `${API_URL}/categories/inDepartment/${departmentId}`;

  dispatch({ type: FETCH_CATEGORIES_START, isFetching: true });
  try {
    const response = await fetch(`${ENDPOINT_URL}`);
    const data = await response.json();

    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: data,
      isFetching: false,
      fetchError: false
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      fetchError: true,
      isFetching: false,
      errorMessage: error.message
    });
  }
};
