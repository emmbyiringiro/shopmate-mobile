import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
class CheckoutButton extends Component {
  renderButton = () => {
    return (
      <View>
        {this.props.cart.length ? (
          <Button
            onPress={() => this.props.navigation.navigate("Checkout")}
            type="solid"
            title="Checkout"
            iconRight
            buttonStyle={{
              backgroundColor: theme.black
            }}
            icon={<Icon name="navigate-next" color={theme.white} size={20} />}
          />
        ) : null}
      </View>
    );
  };
  render() {
    return this.renderButton();
  }
}
const mapStateToProps = state => {
  return { cart: state.cart.result };
};

export default connect(mapStateToProps)(CheckoutButton);
