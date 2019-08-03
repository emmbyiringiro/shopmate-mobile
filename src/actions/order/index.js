import {
  // Place order types
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  // Get Customer Orders types
  GET_CUSTOMER_ORDERS_START,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAILURE,
  // Get single order
  GET_ORDER_START,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE
} from "./types";
import { AUTH_TOKEN_EXPIRED } from "../services/types";
import axios from "axios";
import { API_URL } from "../../constants";

export const placeCustomerOrder = (
  { cart_id, shipping_id, tax_id },
  { stripeToken, order_id, description, amount, currency },
  token
) => async dispatch => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "USER-KEY": `${token}`
    }
  };
  dispatch({
    type: PLACE_ORDER_START,
    paymentPending: true
  });

  try {
    // create customer order
    const createOrder = await axios.post(
      `${API_URL}/orders`,
      {
        cart_id,
        shipping_id,
        tax_id
      },
      config
    );

    let order_id = createOrder.data.orderId;

    // process customer current order with stripe
    const { status, data } = await axios.post(
      `${API_URL}/stripe/charge`,
      {
        stripeToken,
        order_id,
        description,
        amount,
        currency
      },
      config
    );
    if (status === 200) {
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        paymentPending: false,
        result: data
      });
    }
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAILURE,
      paymentPending: false,
      paymentError: true,
      errorMessage: error.response
    });
  }
};

export const getCustomerOrders = authToken => async dispatch => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "USER-KEY": `${authToken}`
    }
  };
  dispatch({ type: GET_CUSTOMER_ORDERS_START, isFetching: true });

  try {
    const { data, status } = await axios.get(
      `${API_URL}/orders/inCustomer`,
      config
    );

    if (status === 200) {
      console.log(data);
      dispatch({
        type: GET_CUSTOMER_ORDERS_SUCCESS,
        isFetching: false,
        result: data
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      dispatch({ type: AUTH_TOKEN_EXPIRED, authTokenExpired: true });
    }
    dispatch({
      type: GET_CUSTOMER_ORDERS_FAILURE,
      fetchError: true,
      errorMessage: error.response,
      isFetching: false
    });
  }
};

export const getOrder = (authToken, orderId) => async dispatch => {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "USER-KEY": `${authToken}`
    }
  };
  dispatch({ type: GET_ORDER_START, isFetching: true });

  try {
    const { data, status } = await axios.get(
      `${API_URL}/orders/${orderId}`,
      config
    );

    if (status === 200) {
      dispatch({
        type: GET_ORDER_SUCCESS,
        isFetching: false,
        result: data
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      dispatch({ type: AUTH_TOKEN_EXPIRED, authTokenExpired: true });
    }
    dispatch({
      type: GET_ORDER_FAILURE,
      fetchError: true,
      errorMessage: error.response,
      isFetching: false
    });
  }
};
