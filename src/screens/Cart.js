import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import CartList from "./../components/cart/CartList";
import CartTotals from "./../components/cart/CartTotals";
import { theme } from "./../color-themes";

class Cart extends Component {
  static navigationOptions = {
    title: "Your basket",
    headerRight: <CartTotals />
  };

  render() {
    return (
      <ScrollView>
        <CartList {...this.props} />
      </ScrollView>
    );
  }
}

export default Cart;
