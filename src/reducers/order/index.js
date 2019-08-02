import {
  //Place order types
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  // Get customer orders types
  GET_CUSTOMER_ORDERS_START,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAILURE
} from "../../actions/order/types";

import { AUTH_TOKEN_EXPIRED } from "../../actions/services/types";

const initialPlaceOrderState = {
  result: [],
  paymentError: false,
  paymentPending: false,
  errorMessage: ""
};
export const placeOrder = (state = initialPlaceOrderState, action) => {
  switch (action.type) {
    case PLACE_ORDER_START:
      return {
        ...state,

        paymentPending: action.paymentPending
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        result: action.result,
        paymentPending: action.paymentPending,
        paymentError: action.paymentError
      };

    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        paymentPending: action.paymentPending,
        paymentError: action.paymentError
      };

    default:
      return state;
  }
};

const initialCustomerOrderState = {
  result: [],
  fetchError: false,
  isFetching: false,
  errorMessage: null,
  authTokenExpired: false
};
export const customerOrders = (state = initialCustomerOrderState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_ORDERS_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GET_CUSTOMER_ORDERS_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        errorMessage: action.errorMessage
      };
    case AUTH_TOKEN_EXPIRED:
      return {
        ...state,
        authTokenExpired: action.authTokenExpired
      };
    default:
      return state;
  }
};
