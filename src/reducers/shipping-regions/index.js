import {
  FETCH_REGIONS_START,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  //
  FETCH_SHIPPING_OPTIONS_START,
  FETCH_SHIPPING_OPTIONS_SUCCESS,
  FETCH_SHIPPING_OPTIONS_FAILURE
} from "../../actions/shipping-regions/types";

const initialShippingRegions = {
  result: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const shippingRegions = (state = initialShippingRegions, action) => {
  switch (action.type) {
    case FETCH_REGIONS_START:
      return {
        ...state,

        isFetching: action.isFetching
      };

    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_REGIONS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        fetchError: action.fetchError,
        error: action.error
      };

    default:
      return state;
  }
};

// Get shipping options reducer
const initialShippingOptions = {
  result: [],
  fetchError: false,
  isFetching: false,
  error: null
};
export const shippingOptions = (state = initialShippingOptions, action) => {
  switch (action.type) {
    case FETCH_SHIPPING_OPTIONS_START:
      return {
        ...state,

        isFetching: action.isFetching
      };

    case FETCH_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case FETCH_SHIPPING_OPTIONS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        fetchError: action.fetchError,
        error: action.error
      };

    default:
      return state;
  }
};
