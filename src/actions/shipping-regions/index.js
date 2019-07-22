import {
  FETCH_REGIONS_START,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  UPDATE_SHIPPING_REGION
} from "./types";
import { SHIPPING_REGIONS_ENDPOINT } from "../../constants";

export const getShippingRegions = () => async dispatch => {
  dispatch({ type: FETCH_REGIONS_START, isFetching: true });
  try {
    const response = await fetch(SHIPPING_REGIONS_ENDPOINT);
    const data = await response.json();

    dispatch({
      type: FETCH_REGIONS_SUCCESS,
      result: data,
      isFetching: false,
      fetchError: false
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_REGIONS_FAILURE,
      fetchError: true,
      isFetching: false
    });
  }
};

export const updateShippingRegion = shipping_id => {
  return { type: UPDATE_SHIPPING_REGION, value: shipping_id };
};
