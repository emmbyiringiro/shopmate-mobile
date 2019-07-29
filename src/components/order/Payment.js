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
// This import applied to expo client environment only
//it'll be switched to  import stripe from 'tipsi-stripe'  in production
import { DangerZone } from "expo";
const { Stripe } = DangerZone;

class Payment extends Component {
  state = {
    taxPercentage: 0,
    taxId: 1,
    description: "",
    stripeToken: null,
    loadingToken: false,
    errorToken: null
  };

  componentWillMount() {
    Stripe.setOptionsAsync({
      publishableKey: "pk_test_3HWohRBC7VJxG1MTXCOZu8GS00VcOPYR3i",
      androidPayMode: "test"
    });
  }
  componentDidMount() {
    // Get taxes rates  from backend server
    this.props.getTaxes();
  }

  handleCardPayment = async () => {
    try {
      this.setState({ loadingToken: true, stripeToken: null });
      const stripeToken = await Stripe.paymentRequestWithCardFormAsync();

      this.setState({ stripeToken });
      console.log(stripeToken);
    } catch (error) {
      console.log(error);
      this.setState({ errorToken: error });
    }
  };
  _renderOrderDescription = () => {
    return (
      <Input
        label="Order description"
        labelStyle={{ fontSize: 15, color: theme.black }}
        placeholder="Ship to ...."
        inputStyle={{ fontSize: 14 }}
        multiline={true}
        numberOfLines={3}
        onChangeText={text => this.setState({ description: text })}
      />
    );
  };

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
          <Text style={styles.headerTextStyle}> Order Information </Text>
        </View>
        <View style={styles.orderTotalContainer}>
          {this._renderTaxesOptions()}
          {this._renderOrderTotals()}
        </View>
        {this._renderOrderDescription()}

        <View style={styles.placeOrderButtonContainer}>
          <Button
            onPress={() => this.handleCardPayment()}
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
  totalTextStyle: { fontWeight: "700" },
  placeOrderButtonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.white
  },
  orderTotalContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10
  }
});

export default connect(
  mapStateToProps,
  { getTaxes }
)(Payment);
