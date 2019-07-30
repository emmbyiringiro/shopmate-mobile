import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE
} from "./types";
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

    console.log(data);
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PLACE_ORDER_FAILURE,
      paymentPending: false,
      paymentError: true,
      errorMessage: error.response
    });
  }
};
