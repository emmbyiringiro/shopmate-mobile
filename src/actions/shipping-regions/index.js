import {
  FETCH_REGIONS_START,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  //
  FETCH_SHIPPING_OPTIONS_START,
  FETCH_SHIPPING_OPTIONS_SUCCESS,
  FETCH_SHIPPING_OPTIONS_FAILURE,
  UPDATE_SHIPPING_REGION
} from "./types";
import { API_URL } from "../../constants";

import axios from "axios";

export const getShippingRegions = () => async dispatch => {
  dispatch({ type: FETCH_REGIONS_START, isFetching: true });
  try {
    const { status, data } = await axios.get(`${API_URL}/shipping/regions`);

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

export const getShippingOptions = regionId => async dispatch => {
  dispatch({ type: FETCH_SHIPPING_OPTIONS_START, isFetching: true });
  try {
    const { status, data } = await axios.get(
      `${API_URL}/shipping/regions/${regionId}`
    );
    dispatch({
      type: FETCH_SHIPPING_OPTIONS_SUCCESS,
      result: data,
      isFetching: false,
      fetchError: false
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_SHIPPING_OPTIONS_FAILURE,
      fetchError: true,
      isFetching: false
    });
  }
};

export const updateShippingRegion = shipping_id => {
  return { type: UPDATE_SHIPPING_REGION, value: shipping_id };
};
