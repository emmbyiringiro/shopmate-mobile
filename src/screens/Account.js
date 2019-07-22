import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

import Authenticate from "../components/authentication/Authenticate";
import AuthSuccess from "../components/authentication/AuthSuccess";
import { authenticateUser } from "../actions/services";
import { removeAuthenticationToken, removesShippingAddress } from "../utils";
class Account extends Component {
  signOut = () => {
    removeAuthenticationToken();
    removesShippingAddress(() => {
      console.log("Shipping Address removed");
    });
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
