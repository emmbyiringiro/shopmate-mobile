import React, { Component } from "react";
import { Text, View } from "react-native";
import CheckoutWrapper from "./../components/order/CheckoutWrapper";

class Checkout extends Component {
  static navigationOptions = {
    title: "Checkout"
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
