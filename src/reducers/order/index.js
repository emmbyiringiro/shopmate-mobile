import {
  //Place order types
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  // Get customer orders types
  GET_CUSTOMER_ORDERS_START,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAILURE,
  // Get order type
  GET_ORDER_START,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE
} from "../../actions/order/types";

import { AUTH_TOKEN_EXPIRED } from "../../actions/services/types";

//---- Handle Payment reducer -----
const initialPlaceOrderState = {
  result: [],
  paymentError: false,
  paymentPending: false,
  error: null,
  customerPaid: null
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
        customerPaid: action.customerPaid,
        paymentError: action.paymentError
      };

    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        paymentPending: action.paymentPending,
        paymentError: action.paymentError,
        error: action.error
      };

    default:
      return state;
  }
};

// --- Get active customer order reducer ---
const initialCustomerOrderState = {
  result: [],
  fetchError: false,
  isFetching: false,
  error: null,
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
        error: action.error
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
// --- Get product in order reducer ----
const initialOrderProductsState = {
  result: [],
  fetchError: false,
  isFetching: false,
  error: null,
  authTokenExpired: false
};
export const order = (state = initialOrderProductsState, action) => {
  switch (action.type) {
    case GET_ORDER_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GET_ORDER_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        error: action.error
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
