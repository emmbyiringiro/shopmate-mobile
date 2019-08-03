/* Component act as container for <LoginForm> and <SignupForm> */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { connect } from "react-redux";
import { removesShippingAddress } from "../../utils";
import { theme } from "../../color-themes";

class Authenticate extends Component {
  state = { toggleSignUp: false };

  handleToggleSignUp = () => {
    this.setState({ toggleSignUp: !this.state.toggleSignUp });
  };
  render() {
    const { toggleSignUp } = this.state;
    return (
      <View style={styles.container}>
        {toggleSignUp ? <SignupForm /> : <LoginForm />}
        <View style={styles.sectionStyle}>
          {toggleSignUp ? (
            <Text> You already have account.</Text>
          ) : (
            <Text> You don't have account.</Text>
          )}
          <Button
            onPress={this.handleToggleSignUp}
            title={toggleSignUp ? "Sign In" : "Sign Up"}
            type="clear"
            titleStyle={{ color: theme.primary }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
});

export default connect(mapStateToProps)(Authenticate);
