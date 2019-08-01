/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { getCustomerInfo, authenticateUser } from "../actions/services";
import { theme } from "./../color-themes";

import {
  retrieveAuthenticationToken,
  removeAuthenticationToken
} from "../utils";
class Menu extends Component {
  async componentDidMount() {
    const authToken = await retrieveAuthenticationToken();

    if (authToken !== null) {
      await this.props.getCustomerInfo(authToken);
      await this.props.authenticateUser(true);
    }
  }

  async componentDidUpdate() {
    if (this.props.authTokenExpired) {
      await this.props.authenticateUser(false);
      await removeAuthenticationToken();
    }
  }
  _renderMenuList = () => {
    const list = [
      { title: "Profile", icon: "person-outline", link: "EditProfile" },
      { title: "Account", icon: "lock-outline", link: "Account" }
    ];

    return list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
        type="fontawesome"
        onPress={() => {
          this.props.navigate(item.link);
        }}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[styles.headerSectionStyle, { backgroundColor: theme.gray }]}
        >
          <Icon name="account-circle" size={60} />

          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold"
            }}
          >
            Hello! {this.props.customerInfo.name}
          </Text>
        </View>
        {this._renderMenuList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerInfo: state.customer.result,
    authTokenExpired: state.customer.authTokenExpired
  };
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  headerSectionStyle: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  { getCustomerInfo, authenticateUser }
)(Menu);
