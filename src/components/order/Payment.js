/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Picker,
  KeyboardAvoidingView
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
import {
  getShippingRegions,
  getShippingOptions
} from "../../actions/shipping-regions";
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
    regionId: 2,
    shippingId: 1,
    shippingCost: 20
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
    // get shipping options from Backend
    await this.props.getShippingOptions(2);
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
        selectedValue={this.state.regionId}
        onValueChange={value => {
          this.setState({ regionId: value });
          this.props.getShippingOptions(value);
        }}
        itemStyle={{ fontSize: 11 }}
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

  _renderShippingOptions = () => {
    const { shippingOptions, isShippingOptionsFetching } = this.props;

    if (isShippingOptionsFetching) {
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
          this.setState(
            {
              shippingId: value
            },
            () => {
              this.setState({
                shippingCost: shippingOptions.find(
                  shipping => shipping.shipping_id === this.state.shippingId
                ).shipping_cost
              });
            }
          );
        }}
        itemStyle={{ fontSize: 11 }}
      >
        {shippingOptions.map(option => {
          return (
            <Picker.Item
              key={option.shipping_id}
              label={option.shipping_type}
              value={option.shipping_id}
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

    const { taxPercentage, shippingCost } = this.state;
    let tax = calculateTaxAmount(cart, taxPercentage);
    let subtotal = calculateOrderAmount(cart);
    let total =
      parseFloat(subtotal) + parseFloat(tax) + parseFloat(shippingCost);

    return (
      <View>
        <Text>Tax : ${tax}</Text>
        <Text> Subtotal : ${subtotal}</Text>
        <Text> Shipping Cost : ${shippingCost}</Text>
        <Text style={styles.totalTextStyle}>Total : $ {total}</Text>
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
      <KeyboardAvoidingView
        style={styles.containerStyle}
        enabled
        behavior="padding"
      >
        <Text style={styles.headerTextStyle}> Order Information </Text>

        <View style={styles.orderTotalContainer}>
          {this._renderTaxesOptions()}
          {this._renderOrderTotals()}
        </View>
        <Text style={{ fontWeight: "bold" }}> Ship my products to :</Text>

        {this._renderShippingRegions()}
        <Text style={{ fontWeight: "bold" }}>
          Products will be shipped via :
        </Text>

        {this._renderShippingOptions()}
        {this._renderOrderDescription()}

        <View>
          <Button
            containerStyle={{
              padding: 20,
              alignItems: "flex-end",
              justifyContent: "flex-end"
            }}
            onPress={() => this.handleCardPayment()}
            type={paymentPending ? "clear" : "solid"}
            title="Place Order"
            titleStyle={{ fontSize: 15 }}
            buttonStyle={{
              backgroundColor: paymentPending ? "transparent" : theme.black
            }}
            disabled={isshippingRegionsFetching}
            loading={paymentPending}
          />
        </View>
      </KeyboardAvoidingView>
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
    shippingOptions: state.shippingOptions.result,
    isShippingOptionsFetching: state.shippingOptions.isFetching,
    customerPaid: state.placeOrder.result.paid,
    paymentPending: state.placeOrder.paymentPending
  };
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: theme.gray,
    margin: 5,
    padding: 20
  },

  sectionStyle: { paddingBottom: 15 },

  headerTextStyle: { fontWeight: "700", fontSize: 16 },
  totalTextStyle: { fontWeight: "700" },

  orderTotalContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10
  }
});

export default connect(
  mapStateToProps,
  { getTaxes, getShippingRegions, placeCustomerOrder, getShippingOptions }
)(Payment);
