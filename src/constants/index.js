import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("screen").width;
export const DEVICE_HEIGHT = Dimensions.get("screen").height;

export const API_URL = "https://mobilebackend.turing.com";
export const IMG_URL_ENDPOINT = `https://mobilebackend.turing.com/images/products/`;
export const CUSTOMER_SIGNUP_ENDPOINT = `https://mobilebackend.turing.com/customers`;
export const CUSTOMER_LOGIN_ENDPOINT = `https://mobilebackend.turing.com/customers/login`;
export const UPDATE_CUSTOMER_ADDRESS_ENDPOINT = `https://mobilebackend.turing.com/customers/address`;
export const SHIPPING_REGIONS_ENDPOINT =
  "https://mobilebackend.turing.com/shipping/regions";

export const SHOPMATE_LOGIN_TOKEN = "SHOPMATE_LOGIN_TOKEN";
export const SHOPMATE_CUSTOMER_ADDRESS = "SHOPMATE_CUSTOMER_ADDRESS";
export const SHOPMATE_CART_ID = "SHOPMATE_CART_ID";
