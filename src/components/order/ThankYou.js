/* Thank You Page after order payment
 * and suggest  other products customer  ciuld buy
 */

import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";
import ProductList from "../products/ProductList";
import { theme } from "../../color-themes";
import { SHOPMATE_CART_ID } from "../../constants";
import { getProductInCart } from "../../actions/cart";
import { connect } from "react-redux";
class ThankYou extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.iconContainerStyle}>
          <Icon name="check-circle" size={40} color={theme.primary} />
          <Text style={{ fontWeight: "700" }}>Thank You for Purchase !</Text>
        </View>
        <View style={styles.suggestionTextStyle}>
          <Text style={{ fontWeight: "700", fontSize: 17 }}>
            You may also like
          </Text>
        </View>
        <ProductList {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainerStyle: {
    backgroundColor: theme.gray,
    margin: 10,
    padding: 10,
    width: Dimensions.get("window").width,

    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.tertiary
  },
  suggestionTextStyle: {
    alignSelf: "flex-start",
    padding: 20
  }
});
export default connect(
  null,
  { getProductInCart }
)(ThankYou);
