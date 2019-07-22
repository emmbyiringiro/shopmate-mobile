import {
  GENERATE_CART_ID_START,
  GENERATE_CART_ID_SUCCESS,
  GENERATE_CART_ID_FAILURE,
  GET_CART_ID_LOCAL,
  // Add to cart start
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  // get products inCart
  GET_PRODUCT_INCART_START,
  GET_PRODUCT_INCART_SUCCESS,
  GET_PRODUCT_INCART_FAILURE,
  // Remove product inCart
  REMOVE_PRODUCT_INCART_START,
  REMOVE_PRODUCT_INCART_SUCCESS,
  REMOVE_PRODUCT_INCART_FAILURE,
  // Update product inCart
  UPDATE_PRODUCT_INCART_START,
  UPDATE_PRODUCT_INCART_SUCCESS,
  UPDATE_PRODUCT_INCART_FAILURE
} from "../../actions/cart/types";

/* -------------------------- */
/*  Generate cart id  */
/* ------------------------- */
const initialCartId = {
  cartId: null,
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const cartId = (state = initialCartId, action) => {
  switch (action.type) {
    case GENERATE_CART_ID_START:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case GENERATE_CART_ID_SUCCESS:
      return {
        ...state,
        cartId: action.payload,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GENERATE_CART_ID_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        errorMessage: action.errorMessage
      };
    case GET_CART_ID_LOCAL:
      return {
        ...state,
        cartId: action.cartId
      };
    default:
      return state;
  }
};

/* -------------------------- */
/*   Get cart Items by cart ID    */
/* ------------------------- */
const initialInCartState = {
  result: [],
  fetchError: false,
  isFetching: false,
  errorMessage: ""
};
export const cart = (state = initialInCartState, action) => {
  switch (action.type) {
    case GET_PRODUCT_INCART_START:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case GET_PRODUCT_INCART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case GET_PRODUCT_INCART_FAILURE:
      return {
        ...state,
        fetchError: action.fetchError,
        isFetching: action.isFetching,
        errorMessage: action.errorMessage
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isFetching,
        fetchError: action.fetchError
      };

    case REMOVE_PRODUCT_INCART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isRemovingToCart,
        fetchError: action.removeToCartError
      };

    case UPDATE_PRODUCT_INCART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isFetching: action.isUpdating,
        fetchError: action.updateProductError
      };

    default:
      return state;
  }
};

/* -------------------------- */
/*  Add product   to cart      */
/* ------------------------- */
const initialAddToCartState = {
  result: [],
  fetchError: false,
  isAddingToCart: false,
  addToCartError: false,
  errorMessage: ""
};
export const addToCart = (state = initialAddToCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART_START:
      return {
        ...state,
        isAddingToCart: action.isAddingToCart
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isAddingToCart: action.isAddingToCart,
        addToCartError: action.addToCartError
      };

    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        addToCartError: action.addToCartError,
        isAddingToCart: action.isAddingToCart,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

/* -------------------------- */
/*  Remove product  inCart ---*/
/* ------------------------- */
const initialRemoveToCartState = {
  productRemoved: false,
  removeToCartError: false,
  isAddingToCart: false,
  errorMessage: ""
};
export const removeToCart = (state = initialRemoveToCartState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_INCART_START:
      return {
        ...state,
        isRemovingToCart: action.isRemovingToCart
      };

    case REMOVE_PRODUCT_INCART_SUCCESS:
      return {
        ...state,
        isRemovingToCart: action.isRemovingToCart,
        productRemoved: action.productRemoved
      };

    case REMOVE_PRODUCT_INCART_FAILURE:
      return {
        ...state,
        removeToCartError: action.removeToCartError,
        isRemovingToCart: action.isRemovingToCart,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

/* --------------------------------- */
/*  update  product inCart  actions */
/* ------------------------------- */
const initialUpdateProductState = {
  result: [],
  updateProductError: false,
  isUpdating: false,
  errorMessage: ""
};
export const updateProductInCart = (
  state = initialUpdateProductState,
  action
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_INCART_START:
      return {
        ...state,
        isUpdating: action.isUpdating
      };

    case UPDATE_PRODUCT_INCART_SUCCESS:
      return {
        ...state,
        result: action.result,
        isUpdating: action.isUpdating
      };

    case UPDATE_PRODUCT_INCART_FAILURE:
      return {
        ...state,
        updateProductError: action.updateProductError,
        isUpdating: action.isUpdating,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};
