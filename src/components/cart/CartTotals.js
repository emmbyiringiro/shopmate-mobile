import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { theme } from "./../../color-themes";

class CartTotals extends React.Component {
  calculateCartTotals = () => {
    let result = 0;
    if (this.props.cart.length === 0) {
      return null;
    }

    result = this.props.cart
      .map(({ subtotal }) => {
        return subtotal;
      })
      .reduce((total, subTotal) => Number(total) + Number(subTotal));
    return `$ ${Number(result).toFixed(2)}`;
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{this.calculateCartTotals()}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart.result };
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10
  },
  textStyle: { fontSize: 15, fontWeight: "800", color: theme.primary }
});
export default connect(mapStateToProps)(CartTotals);
