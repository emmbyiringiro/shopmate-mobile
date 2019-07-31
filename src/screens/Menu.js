/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export default class Menu extends Component {
  _renderMenuList = () => {
    const list = [
      { title: "Profile", icon: "user-o" },
      { title: "Shipping Address", icon: "truck" },
      { title: "Login/Logout", icon: "key" }
    ];
  };
  render() {
    return <View style={styles.container}>{this._renderMenuList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
