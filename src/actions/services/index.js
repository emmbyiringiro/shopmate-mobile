import {
  // Get customer information
  GET_CUSTOMER_INFO_START,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  // user action types
  USER_SEARCHING,
  ADDRESS_FORM_SUBMIT,
  AUTHENTICATE_USER
} from "./types";

import { API_URL } from "../../constants";

import axios from "axios";

export const getCustomerInfo = authToken => async dispatch => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "USER-KEY": `${authToken}`
    }
  };
  dispatch({ type: GET_CUSTOMER_INFO_START, isFetching: true });

  try {
    const { data, status } = await axios.get(`${API_URL}/customer`, config);

    if (status === 200) {
      dispatch({
        type: GET_CUSTOMER_INFO_SUCCESS,
        isFetching: false,
        result: data
      });
    }
  } catch ({ response }) {
    dispatch({
      type: GET_CUSTOMER_INFO_FAILURE,
      fetchError: true,
      errorMessage: response.error.message,
      isFetching: false
    });
  }
};
export const userSearchingProducts = () => {
  return { type: USER_SEARCHING, isUserSearching: true };
};

export const authenticateUser = status => {
  return { type: AUTHENTICATE_USER, status };
};
