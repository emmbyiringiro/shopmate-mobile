import {
  USER_SEARCHING,
  ADDRESS_FORM_SUBMIT,
  AUTHENTICATE_USER
} from "./types";

export const userSearchingProducts = () => {
  return { type: USER_SEARCHING, isUserSearching: true };
};

export const authenticateUser = status => {
  return { type: AUTHENTICATE_USER, status };
};
