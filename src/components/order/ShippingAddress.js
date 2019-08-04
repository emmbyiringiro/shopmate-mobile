/* @ a component which display customer
   @ shipping address  from user device */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { retrieveShippingAddress } from "../../utils";

export default class ShippingAddress extends Component {
  state = { shippingAddress: {} };
  async componentWillMount() {
    const shippingAddress = await retrieveShippingAddress();
    if (shippingAddress !== null) {
      this.setState({ shippingAddress: JSON.parse(shippingAddress) });
    }
  }

  _renderShippingAddress = () => {
    const { shippingAddress } = this.state;
    if (Object.keys(shippingAddress).length !== 0) {
      const {
        address_1,
        address_2,
        city,
        postal_code,
        region,
        country
      } = shippingAddress;
      return (
        <View
          style={{
            padding: 20,
            paddingTop: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>
            {`${address_1} -  ${address_2} -  ${postal_code} -  ${city} -  ${region} -  ${country} . `}
          </Text>
        </View>
      );
    }

    return <Text> No shipping address available</Text>;
  };
  render() {
    return this._renderShippingAddress();
  }
}
