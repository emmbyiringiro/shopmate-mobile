import {
  FETCH_DEPARTMENTS_START,
  FETCH_DEPARTMENTS_SUCCESS,
  FETCH_DEPARTMENTS_FAILURE
} from "./types";
import { API_URL } from "./../../constants";

export const getDepartments = () => async dispatch => {
  const ENDPOINT_URL = `${API_URL}/departments`;

  dispatch({ type: FETCH_DEPARTMENTS_START, isFetching: true });
  try {
    const response = await fetch(`${ENDPOINT_URL}`);
    const data = await response.json();

    dispatch({
      type: FETCH_DEPARTMENTS_SUCCESS,
      payload: data,
      isFetching: false,
      fetchError: false
    });
  } catch (error) {
    dispatch({
      type: FETCH_DEPARTMENTS_FAILURE,
      fetchError: true,
      isFetching: false,
      error: error.response
    });
  }
};
