import {
  // Get customer information
  GET_CUSTOMER_INFO_START,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  AUTH_TOKEN_EXPIRED,
  // user action types
  USER_SEARCHING,
  AUTHENTICATE_USER
} from "./types";

import { API_URL } from "../../constants";

import axios from "axios";

// Get customer profile ( Account info)
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
  } catch (error) {
    if (error.response.status === 500) {
      dispatch({ type: AUTH_TOKEN_EXPIRED, authTokenExpired: true });
    }
    dispatch({
      type: GET_CUSTOMER_INFO_FAILURE,
      fetchError: true,
      error: error.response,
      isFetching: false
    });
  }
};

// -- Action creator to detect when user search products
export const userSearchingProducts = () => {
  return { type: USER_SEARCHING, isUserSearching: true };
};

// -- Receive boolean value (true/false) to log/logout user
export const authenticateUser = status => {
  return { type: AUTHENTICATE_USER, status };
};
