/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Picker
} from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
import {
  calculateTaxAmount,
  calculateOrderAmount,
  retrieveAuthenticationToken
} from "../../utils";
import { getTaxes } from "../../actions/tax";
import { getShippingRegions } from "../../actions/shipping-regions";
import { SHOPMATE_CART_ID } from "../../constants";

// This import applied to expo client environment only
//it'll be switched to  import stripe from 'tipsi-stripe'  in production
import { DangerZone } from "expo";
const { Stripe } = DangerZone;
import { placeCustomerOrder } from "../../actions/order";

class Payment extends Component {
  state = {
    taxPercentage: 0,
    taxId: 1,
    description: "",
    stripeToken: null,
    loadingToken: false,
    errorToken: null,
    amount: 0,
    shippingId: 2
  };

  componentWillMount() {
    Stripe.setOptionsAsync({
      publishableKey: "pk_test_NcwpaplBCuTL6I0THD44heRe",
      androidPayMode: "test"
    });
  }
  async componentDidMount() {
    // Get taxes rates  from backend server
    await this.props.getTaxes();
    //Get Shipping regions from backend server except
    // when are already fetched
    if (!this.props.shippingRegions.length) {
      await this.props.getShippingRegions();
    }
  }
  placeOrderBackend = async () => {
    const {
      stripeToken,
      description,
      taxId,
      taxPercentage,
      shippingId
    } = this.state;

    const { cart } = this.props;
    // current customer cart id
    const cartId = await AsyncStorage.getItem(SHOPMATE_CART_ID);
    // total order amount
    let amount = calculateOrderAmount(cart, taxPercentage);
    // Backend API  restricted amount not  less than 50 cents - convert
    // amount to dollar currency by * 100
    amount = Number(amount) * 100;

    // create order params object
    const order = {
      cart_id: cartId,
      shipping_id: shippingId,
      tax_id: taxId
    };
    // stripe payment params object
    const stripe = {
      stripeToken,
      description,
      amount,
      currency: "USD"
    };

    authToken = await retrieveAuthenticationToken();
    this.props.placeCustomerOrder(order, stripe, authToken);
  };
  handleCardPayment = async () => {
    try {
      this.setState({ loadingToken: true, stripeToken: null });
      const { tokenId } = await Stripe.paymentRequestWithCardFormAsync();

      this.setState({ stripeToken: tokenId });
      this.placeOrderBackend();
      console.log(tokenId);
    } catch (error) {
      console.log(error);
      this.setState({ errorToken: error });
    }
  };

  _renderShippingRegions = () => {
    const { shippingRegions, isshippingRegionsFetching } = this.props;

    if (isshippingRegionsFetching) {
      return (
        <View>
          <ActivityIndicator color={theme.primary} size="small" />
        </View>
      );
    }
    return (
      <Picker
        selectedValue={this.state.shippingId}
        onValueChange={value => {
          this.setState({ shippingId: value });
        }}
      >
        {shippingRegions.map(region => {
          return (
            <Picker.Item
              key={region.shipping_region_id}
              label={region.shipping_region}
              value={region.shipping_region_id}
            />
          );
        })}
      </Picker>
    );
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
          }}
        />
        <View />
      </View>
    );
  };
  render() {
    const {
      navigation,
      customerPaid,
      isshippingRegionsFetching,
      paymentPending
    } = this.props;

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
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}> Shipping Region :</Text>
        </View>
        {this._renderShippingRegions()}

        <View style={styles.placeOrderButtonContainer}>
          <Button
            onPress={() => this.handleCardPayment()}
            type={paymentPending ? "clear" : "solid"}
            title="Place Order"
            titleStyle={{ fontSize: 15 }}
            buttonStyle={{
              backgroundColor: theme.black
            }}
            disabled={isshippingRegionsFetching}
            loading={paymentPending}
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
    cart: state.cart.result,
    cartId: state.cartId.cartId,
    shippingRegions: state.shippingRegions.result,
    isshippingRegionsFetching: state.shippingRegions.isFetching,
    customerPaid: state.order.result.paid,
    paymentPending: state.order.paymentPending
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
  { getTaxes, getShippingRegions, placeCustomerOrder }
)(Payment);
