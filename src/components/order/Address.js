/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, Picker } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { required, email, numericality } from "redux-form-validators";
import axios from "axios";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
import { getShippingRegions } from "../../actions/shipping-regions";
import {
  SHOPMATE_CUSTOMER_ADDRESS,
  DEVICE_HEIGHT,
  UPDATE_CUSTOMER_ADDRESS_ENDPOINT
} from "../../constants";
import {
  retrieveAuthenticationToken,
  storeShippingAddress,
  retrieveShippingAddress
} from "../../utils";

import { Field, reduxForm } from "redux-form";

class Address extends Component {
  state = {
    error: "",
    initialAddress: {
      address_1: "Addre Line 1",
      address_2: "Address Line 2",
      city: "City",
      region: "Region",
      postal_code: "Zip Code",
      country: "Country",
      region: "Region",
      shipping_region_id: "1"
    },
    addressSubmitted: false,
    isLoading: false
  };

  async componentWillMount() {
    // Check if customer was  already provided shipping
    // address then pre-fill address form with values
    const shippingAddress = await retrieveShippingAddress(shippingAddress => {
      this.setState({ initialAddress: JSON.parse(shippingAddress) });
      //  enable next button due to customer is arlead provided
      // shipping address
      this.props.onAddressSubmitted();
    });
  }

  componentDidMount() {
    this.props.getShippingRegions();
  }
  // Handle shipping address submit
  // the function executed only when address
  // form validation complete
  onSubmit = async formValues => {
    this.setState({ isLoading: true });
    // Switch  OFF  edit  mode

    // a helper function which retrieve JWToken stored
    //on  user device and use it to authenticate user
    const token = await retrieveAuthenticationToken();
    if (token !== null) {
      await this.submitAddress(token, formValues);
      this.setState({ addressSubmitted: true });
      // Enable Stepper next button
      this.props.onAddressSubmitted();
      // Store shipping address on user device
      await storeShippingAddress(formValues);
    }
  };

  submitAddress = async (token, formValues) => {
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "USER-KEY": `${token}`
      }
    };

    try {
      const { data } = await axios.put(
        UPDATE_CUSTOMER_ADDRESS_ENDPOINT,
        formValues,
        config
      );

      this.setState({ isLoading: false });
      console.log(data);
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error.message);
    }
  };
  _renderAddressInputs = ({ label, input, meta: { touched, error } }) => {
    return (
      <Input
        {...input}
        placeholder={label}
        errorMessage={touched && error ? error : ""}
        inputStyle={{
          fontSize: 14
        }}
      />
    );
  };

  _renderShippingRegions = ({
    input: { onChange, value, ...inputProps },
    children,
    ...pickerProps
  }) => {
    return (
      <Picker
        selectedValue={value}
        onValueChange={value => {
          onChange(value);
        }}
        {...inputProps}
        {...pickerProps}
      >
        {children}
      </Picker>
    );
  };
  _renderAddressFormCompleted = () => {
    return (
      <View style={styles.formCompletedStyle}>
        <Icon name="check-circle" size={45} color={theme.primary} />
        <Text> Shipping Address Received. Press Continue Button </Text>
      </View>
    );
  };
  _renderAddressForm = () => {
    const { handleSubmit, shippingRegions } = this.props;
    const {
      address_1,
      address_2,
      city,
      postal_code,
      country,
      region
    } = this.state.initialAddress;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}> Shipping Address : </Text>
        </View>
        <View style={styles.sectionStyleWhite}>
          <Field
            name="address_1"
            component={this._renderAddressInputs}
            label={address_1}
            type="text"
            validate={[
              required({ msg: "Please Provide Shipping Address Line 1" })
            ]}
          />
          <Field
            name="address_2"
            component={this._renderAddressInputs}
            label={address_2}
            type="text"
            validate={[
              required({ msg: "Please Provide Shipping Address Line 2" })
            ]}
          />
          <Field
            name="city"
            component={this._renderAddressInputs}
            label={city}
            type="text"
            validate={[required({ msg: "Your Shipping City is required" })]}
          />

          <Field
            name="region"
            component={this._renderAddressInputs}
            label={region}
            type="text"
            validate={[required({ msg: "Your Shipping Region is required" })]}
          />
          <Field
            name="postal_code"
            component={this._renderAddressInputs}
            label={postal_code}
            type="number"
            validate={[
              required({ msg: "Zip Code is Required " }),
              numericality({
                int: true,
                msg: "Please Provide a Valid Zip Code (ex: 129045)"
              })
            ]}
          />
          <Field
            name="country"
            component={this._renderAddressInputs}
            label={country}
            validate={[required({ msg: "Your shipping country is required" })]}
          />

          <Field
            name="shipping_region_id"
            component={this._renderShippingRegions}
            label={country}
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
          </Field>

          <View style={{ padding: 20 }}>
            <Button
              onPress={handleSubmit(this.onSubmit)}
              title="Save"
              loading={this.state.isLoading}
              buttonStyle={{ backgroundColor: theme.primary }}
              icon={<Icon name="save" color={theme.white} />}
            />
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { addressSubmitted } = this.state;
    return addressSubmitted
      ? this._renderAddressFormCompleted()
      : this._renderAddressForm();
  }
}

const mapStateToProps = state => {
  return { shippingRegions: state.shippingRegions.result };
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.gray,
    height: DEVICE_HEIGHT * 0.8
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  sectionStyleWhite: {
    padding: 10,
    backgroundColor: theme.white,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: theme.secondary
  },
  formCompletedStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.white,
    padding: 10
  },

  headerTextStyle: { fontWeight: "700", fontSize: 16 }
});

const decoratedForm = reduxForm({ form: "address" })(Address);
export default connect(
  mapStateToProps,
  { getShippingRegions }
)(decoratedForm);
