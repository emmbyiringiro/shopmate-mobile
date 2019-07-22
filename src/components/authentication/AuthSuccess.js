import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

import { theme } from "../../color-themes";

class AuthSuccess extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="check-circle" size={45} color={theme.primary} />
        <Text style={{ fontWeight: "700" }}>
          {" "}
          You arleady successfully logged in.{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default AuthSuccess;
