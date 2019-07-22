import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import CartList from "./../../components/cart/CartList";
import CartTotal from "./../cart/CartTotals";
import { theme } from "../../color-themes";
import ShippingAddress from "./ShippingAddress";

export class OrderReview extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        {/* Customer Order details section*/}
        <View style={styles.sectionStyle}>
          <View style={[styles.headerStyle, { flexDirection: "row" }]}>
            <Text style={styles.headerTextStyle}>Your Order :</Text>
            <CartTotal />
          </View>
          <CartList {...this.props} displayedInReview={true} />
        </View>
        {/* Shipping Address section*/}
        <View style={styles.sectionStyle}>
          <View style={styles.headerStyle}>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              Your Shipping Address :
            </Text>
          </View>
          <ShippingAddress />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  containerStyle: { flex: 1, backgroundColor: theme.gray, margin: 5 },

  sectionStyle: { paddingBottom: 15 },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.white,
    padding: 10
  },

  headerTextStyle: { fontWeight: "700", fontSize: 16 }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReview);
