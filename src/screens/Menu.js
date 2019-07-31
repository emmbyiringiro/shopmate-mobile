/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { getCustomerInfo } from "../actions/services";

import { retrieveAuthenticationToken } from "../utils";
class Menu extends Component {
  async componentDidMount() {
    const authToken = await retrieveAuthenticationToken();

    if (authToken !== null) {
      this.props.getCustomerInfo(authToken);
    }
  }
  _renderMenuList = () => {
    const list = [
      { title: "Profile", icon: "person-outline" },
      { title: "Shipping Address", icon: "local-shipping" },
      { title: "Login/Logout", icon: "lock-outline" }
    ];

    return list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
        type="fontawesome"
      />
    ));
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

export default connect(
  null,
  { getCustomerInfo }
)(Menu);
