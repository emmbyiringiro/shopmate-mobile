import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Authenticate from "../components/authentication/Authenticate";
import AuthSuccess from "../components/authentication/AuthSuccess";

import { connect } from "react-redux";

import { authenticateUser } from "../actions/services";
import { removeAuthenticationToken, removesShippingAddress } from "../utils";

class Account extends Component {
  static navigationOptions = {
    title: `Account`
  };
  signOut = async () => {
    // Remove user authentication  token
    await removeAuthenticationToken();
    // Remove Pre-saved shipping address
    await removesShippingAddress(() => {
      console.log("Shipping Address removed");
    });
    // Sign-out user
    this.props.authenticateUser(false);
  };
  render() {
    const { loggedIn } = this.props;

    return (
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          marginTop: 40,
          paddingBottom: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {loggedIn ? <AuthSuccess /> : <Authenticate />}
        {loggedIn ? (
          <View>
            <Button
              title="Sign Out"
              type="clear"
              onPress={() => this.signOut()}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(
  mapStateToProps,
  { authenticateUser }
)(Account);
