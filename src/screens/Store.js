import React, { Component } from "react";
import { View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import ProductList from "./../components/products/ProductList";
import Header from "./../components/common/Header";
import { getDepartments } from "./../actions/departments";
import { authenticateUser } from "../actions/services";
import { getProductInCart } from "../actions/cart";
import Departments from "./../components/departments/Departments";
import Categories from "./../components/categories/Categories";
import Search from "./../components/common/Search";
import {
  SHOPMATE_LOGIN_TOKEN,
  SHOPMATE_CUSTOMER_ADDRESS,
  SHOPMATE_CART_ID
} from "../constants";
import { retrieveAuthenticationToken } from "../utils";
class Store extends Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const { getProductInCart } = this.props;
    // Get product departments
    this.props.getDepartments();
    // Retrieve authentication token
    // and authenticate user if available
    retrieveAuthenticationToken(() => {
      this.props.authenticateUser(true);
    });
    //  await AsyncStorage.removeItem(SHOPMATE_CART_ID);
    // get product incart
    const cartId = await AsyncStorage.getItem(SHOPMATE_CART_ID);
    cartId ? getProductInCart(cartId) : null;

    console.log(cartId);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header {...this.props} />
        <Search />
        <Departments />
        <Categories />
        <ProductList {...this.props} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return { cartId: state.cartId.cartId };
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height
  }
});
export default connect(
  mapStateToProps,
  { getDepartments, authenticateUser, getProductInCart }
)(Store);
