import {
  PLACE_ORDER_START,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE
} from "../../actions/order/types";

const initialOrderState = {
  result: [],
  paymentError: false,
  paymentPending: false,
  errorMessage: ""
};
export const order = (state = initialOrderState, action) => {
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
