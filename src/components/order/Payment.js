/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
import { calculateTaxAmount, calculateOrderAmount } from "../../utils";
import { getTaxes } from "../../actions/tax";

class Payment extends Component {
  state = { taxPercentage: 0, taxId: 1, description: "" };
  componentDidMount() {
    // Get taxes rates  from backend server
    this.props.getTaxes();
  }

  _renderOrderTotals = () => {
    const { cart } = this.props;

    const { taxPercentage } = this.state;

    return (
      <View>
        <Text>Tax : ${calculateTaxAmount(cart, taxPercentage)}</Text>
        <Text> Subtotal : ${calculateOrderAmount(cart, 0)}</Text>
        <Text style={styles.totalTextStyle}>
          {" "}
          Total : $ {calculateOrderAmount(cart, taxPercentage)}
        </Text>
      </View>
    );
  };
  _renderTaxesOptions = () => {
    let { taxes, cart, isTaxesFetching } = this.props;
    const { taxPercentage } = this.state;

    taxes = taxes.map(tax => {
      return {
        value: Number(tax.tax_percentage),
        label: tax.tax_type,
        taxId: tax.tax_id
      };
    });

    if (isTaxesFetching) {
      return (
        <View>
          <ActivityIndicator color={theme.primary} size="small" />
        </View>
      );
    }
    return (
      <View>
        <RadioForm
          radio_props={taxes}
          initial={1}
          buttonColor={theme.black}
          selectedButtonColor={theme.black}
          buttonInnerColor={theme.black}
          buttonOuterColor={theme.black}
          borderWidth={1}
          formHorizontal={false}
          labelHorizontal={true}
          buttonSize={10}
          animation={true}
          onPress={(value, taxId) => {
            this.setState({ taxPercentage: value, taxId });
            console.log(this.state.taxId);
          }}
        />
        <View />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}> Tax and Order Total</Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 10
          }}
        >
          {this._renderTaxesOptions()}
          {this._renderOrderTotals()}
        </View>

        <Input
          label="Order description"
          labelStyle={{ fontSize: 15, color: theme.black }}
          placeholder="Ship to ...."
          inputStyle={{ fontSize: 14 }}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => this.setState({ description: text })}
        />
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.white
          }}
        >
          <Button
            onPress={() => console.log("Order Placed ")}
            type="solid"
            title="Place Order"
            titleStyle={{ fontSize: 15 }}
            buttonStyle={{
              backgroundColor: theme.black
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    taxes: state.taxes.result,
    isTaxesFetching: state.taxes.isFetching,
    cart: state.cart.result
  };
};
const styles = StyleSheet.create({
  containerStyle: { flex: 1, backgroundColor: theme.gray, margin: 5 },

  sectionStyle: { paddingBottom: 15 },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.white,
    padding: 10
  },

  headerTextStyle: { fontWeight: "700", fontSize: 16 },
  totalTextStyle: { fontWeight: "700" }
});

export default connect(
  mapStateToProps,
  { getTaxes }
)(Payment);
