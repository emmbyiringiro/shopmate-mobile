/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  state = { taxPercentage: 0, taxI: 1 };
  componentDidMount() {
    this.props.getTaxes();
  }

  renderTaxesOptions = () => {
    let { taxes, cart } = this.props;
    const { taxPercentage } = this.state;

    taxes = taxes.map(tax => {
      return {
        value: Number(tax.tax_percentage),
        label: tax.tax_type,
        taxId: tax.tax_id
      };
    });
    return (
      <View>
        <RadioForm
          radio_props={taxes}
          initial={1}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={theme.primary}
          animation={true}
          onPress={(value, taxId) => {
            this.setState({ taxPercentage: value, taxId });
          }}
        />
        <View>
          <Text>{calculateTaxAmount(cart, taxPercentage)}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}> Tax and Payment</Text>
        </View>
        {this.renderTaxesOptions()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return { taxes: state.taxes.result, cart: state.cart.result };
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

  headerTextStyle: { fontWeight: "700", fontSize: 16 }
});

export default connect(
  mapStateToProps,
  { getTaxes }
)(Payment);
