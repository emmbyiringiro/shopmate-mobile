/** A collection of helpfully functions
 * which used by different components
 * across app
 */

import store from "./../store";
import { SHOPMATE_LOGIN_TOKEN, SHOPMATE_CUSTOMER_ADDRESS } from "../constants";
import { AsyncStorage } from "react-native";

/**  trim string description to specified limit
 *  default limit=55
 */
export const excerpt = (description, limit = 55) => {
  let excerpt = description.substring(0, limit);

  if (limit > 55) {
    return excerpt + "...";
  }
  return excerpt;
};

/**
 * Used by <Product>, function return product image url
 *  by trimming "-thumbnail" prefix
 */
export const thumToImage = url => url.replace("-thumbnail", "");
export const thumToImage2 = url => url.replace("-thumbnail", "-2");

/* store customer authentication token on
 user device **/

export const storeAuthenticationToken = async (token, resolved, rejected) => {
  try {
    await AsyncStorage.setItem(`${SHOPMATE_LOGIN_TOKEN}`, `${token}`);
    if (resolved) {
      resolved(token);
    }
    console.log("Authentication token saved ");
  } catch (error) {
    if (rejected) {
      rejected(error);
    }
    console.log("Shipping Address removal failed", error);
  }
};

/* remove customer authentication token from
 user device **/

export const removeAuthenticationToken = async () => {
  try {
    const token = await AsyncStorage.removeItem(`${SHOPMATE_LOGIN_TOKEN}`);
    console.log(" Removed token is :", token);
  } catch (error) {
    console.log("Ooops, authentication Token removal fail", error);
  }
};

/* a Higher order function which retrieve customer authentication token from
 user device and call resolve or reject callback function **/
export const retrieveAuthenticationToken = async (resolved, rejected) => {
  try {
    const token = await AsyncStorage.getItem(`${SHOPMATE_LOGIN_TOKEN}`);
    if (token !== null && resolved) {
      resolved();
    }
    return token;
  } catch (error) {
    if (rejected) {
      rejected();
      console.log(error);
    }
    console.log("Ooops, authentication Token retrieval fail", error);
  }
};

/* store customer shipping addres  on
 user device for quick access **/

export const storeShippingAddress = async (
  shippingAddress,
  resolved,
  rejected
) => {
  try {
    await AsyncStorage.setItem(
      `${SHOPMATE_CUSTOMER_ADDRESS}`,
      `${JSON.stringify(shippingAddress)}`
    );

    if (shippingAddress !== null && resolved) {
      resolved();
    }
  } catch (error) {
    if (rejected) {
      rejected(error);
      console.log("Shipping Address store failed", error);
    }
  }
};

/* a Higher order function which retrieve customer shipping address from
 user device and call resolve or reject callback function **/
export const retrieveShippingAddress = async (resolved, rejected) => {
  try {
    const shippingAddress = await AsyncStorage.getItem(
      `${SHOPMATE_CUSTOMER_ADDRESS}`
    );
    if (shippingAddress !== null && resolved) {
      resolved(shippingAddress);
    }
    return shippingAddress;
  } catch (error) {
    if (rejected) {
      rejected(error);
    }
    console.log("Shipping Address retrieval failed", error);
  }
};

/* a Higher order function which remove customer shipping address from
 user device and call resolve or reject callback when operation
 fulfilled or fail(rejected) **/
export const removesShippingAddress = async (resolved, rejected) => {
  try {
    const shippingAddress = await AsyncStorage.removeItem(
      `${SHOPMATE_CUSTOMER_ADDRESS}`
    );
    if (shippingAddress === null && resolved) {
      resolved();
    }
  } catch (error) {
    if (rejected) {
      rejected(error);
    }
    console.log("Shipping Address removal failed", error);
  }
};
/* receive cart items array and tax rate as input and
 * return tax amount on customer order
 */
export const calculateTaxAmount = (cart, taxPercentage) => {
  result =
    (cart
      .map(({ subtotal }) => {
        return subtotal;
      })
      .reduce((total, subTotal) => Number(total) + Number(subTotal)) *
      Number(taxPercentage)) /
    100;

  return Number(result).toFixed(2);
};

/*
 * return order amount include tax
 */
export const calculateOrderAmount = cart => {
  result = cart
    .map(({ subtotal }) => {
      return subtotal;
    })
    .reduce((total, subTotal) => Number(total) + Number(subTotal));
  return Number(result).toFixed(2);
};
