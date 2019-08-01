import {
  USER_SEARCHING,
  // Authenticate User action type
  AUTHENTICATE_USER,
  // Get customer information action types
  GET_CUSTOMER_INFO_START,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAILURE,
  AUTH_TOKEN_EXPIRED
} from "../../actions/services/types";

import {
  FETCH_REGIONS_START,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE
} from "../../actions/shipping-regions/types";
export const fetchError = (state = null, action) => {
  switch (action.type) {
    // Fetch shipping region failure error status
    case FETCH_REGIONS_FAILURE:
      return action.fetchError;
    case FETCH_REGIONS_SUCCESS:
      return action.fetchError;

    default:
      return state;
  }
};

export const isFetching = (state = null, action) => {
  // products fetch progress status

  switch (action.type) {
    case FETCH_REGIONS_START:
      return action.isFetching;
    case FETCH_REGIONS_SUCCESS:
      return action.isFetching;
    case FETCH_REGIONS_FAILURE:
      return action.isFetching;

    default:
      return state;
  }
};

export const isUserSearching = (state = null, action) => {
  switch (action.type) {
    case USER_SEARCHING:
      return action.isUserSearching;
    default:
      return state;
  }
};

export const loggedIn = (state = false, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return action.status;
    default:
      return state;
  }
};

const initialCustomerState = {
  result: {},
  fetchError: false,
  isFetching: false,
  errorMessage: "",
  authTokenExpired: false
};
export const customer = (state = initialCustomerState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_INFO_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GET_CUSTOMER_INFO_FAILURE:
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
