import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Header from "./../components/common/Header";
import ProductList from "./../components/products/ProductList";
import { theme } from "../color-themes";

class ThankYou extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <Header {...this.props} />
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
export default ThankYou;
