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
    placeOrderPending: true,
    placeOrderError: false
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

    let orderId = createOrder.data.orderId;
    console.log(orderId, stripeToken);
    // process customer current order with stripe
    const stripePayment = await axios.post(
      `${API_URL}/stripe/charge`,
      {
        stripeToken,
        order_id: orderId,
        description,
        amount,
        currency
      },
      config
    );
    console.log("Payment Result", stripePayment);
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      placeOrderPending: false
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: PLACE_ORDER_FAILURE,
      placeOrderPending: false,
      placeOrderError: true,
      errorMessage: error.response
    });
  }
};
