import {
  FETCH_REGIONS_START,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  UPDATE_SHIPPING_REGION
} from "../../actions/shipping-regions/types";

const initialShippingRegions = {
  result: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
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
        fetchError: action.fetchError
      };

    default:
      return state;
  }
};

export const shippingRegionId = (state = 1, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING_REGION:
      return action.value;

    default:
      return state;
  }
};
