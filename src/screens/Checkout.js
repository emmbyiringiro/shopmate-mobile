import React, { Component } from "react";
import { Text, View } from "react-native";
import CheckoutWrapper from "./../components/order/CheckoutWrapper";
import CartTotals from "../components/cart/CartTotals";

class Checkout extends Component {
  static navigationOptions = {
    title: "Checkout",
    headerRight: <CartTotals />
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CheckoutWrapper {...this.props} />
      </View>
    );
  }
}

export default Checkout;
