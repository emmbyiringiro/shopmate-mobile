import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Button, Icon } from "react-native-elements";
import CartItem from "./CartItem";
import CheckoutButton from "./../order/CheckoutButton";
import { theme } from "../../color-themes";
import { SHOPMATE_CART_ID } from "../../constants";

class CartList extends Component {
  static defaultProps = {
    displayedInReview: false
  };

  renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: this.props.cart.length ? "space-around" : "center",
          marginTop: 20
        }}
      >
        <Button
          onPress={() => this.props.navigation.navigate("Store")}
          type="clear"
          icon={<Icon name="add-circle-outline" size={40} />}
        />
        {!this.props.displayedInReview ? (
          <CheckoutButton {...this.props} />
        ) : null}
      </View>
    );
  };
  renderCartItems = () => {
    const { cart, isFetching } = this.props;
    if (cart.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 200
          }}
        >
          <Text style={{ fontSize: 17, color: "#0f0f0f" }}>
            Your cart is empty. Add item(s)...
          </Text>
        </View>
      );
    }
    if (isFetching) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 200
          }}
        >
          <ActivityIndicator color={theme.primary} size="medium" />
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.cart}
        renderItem={({ item }) => <CartItem {...item} />}
        keyExtractor={item => item.item_id.toString()}
      />
    );
  };

  render() {
    return (
      <View>
        <View style={{ backgroundColor: theme.gray, paddingBottom: 10 }}>
          {this.renderCartItems()}
        </View>
        {this.renderButtons()}
      </View>
    );
  }
}

CartList.propTypes = { displayedInReview: PropType.bool };
const mapStateToProps = state => {
  return {
    cartId: state.cartId.cartId,
    cart: state.cart.result,
    isFetching: state.cart.isFetching,
    loggedIn: state.loggedIn
  };
};

export default connect(
  mapStateToProps,
  {}
)(CartList);
