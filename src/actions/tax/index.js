import { GET_TAX_START, GET_TAX_SUCCESS, GET_TAX_FAILURE } from "./types";
import { API_URL } from "../../constants";

export const getTaxes = () => async dispatch => {
  dispatch({ type: GET_TAX_START, isFetching: true });
  try {
    const response = await fetch(`${API_URL}/tax`);
    const data = await response.json();

    dispatch({
      type: GET_TAX_SUCCESS,
      result: data,
      isFetching: false,
      fetchError: false
    });

    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_TAX_FAILURE,
      fetchError: true,
      isFetching: false
    });
  }
};
