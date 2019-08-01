/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { required, email, numericality, length } from "redux-form-validators";
import axios from "axios";
import { connect } from "react-redux";
import { theme } from "../color-themes";
import { getCustomerInfo } from "../actions/services";

import { SHOPMATE_CUSTOMER_ADDRESS, API_URL } from "../constants";
import { retrieveAuthenticationToken } from "../utils";

import Authenticate from "../components/authentication/Authenticate";

import { Field, reduxForm } from "redux-form";

class EditProfile extends Component {
  state = {
    error: "",
    customerInfo: { name: "", email: "", mob_phone: "" },
    addressSubmitted: false,
    isLoading: false
  };
  static navigationOptions = {
    title: `Your Profile`
  };
  async componentDidMount() {
    const { customerInfo, getCustomerInfo } = this.props;
    const authToken = await retrieveAuthenticationToken();
    if (!customerInfo.length && authToken) {
      await this.props.getCustomerInfo(authToken);
    }

    this.setState({ customerInfo: this.props.customerInfo });
  }

  onSubmit = async formValues => {
    this.setState({ isLoading: true });

    const authToken = await retrieveAuthenticationToken();
    if (authToken !== null) {
      await this.updateProfile(authToken, formValues);
    }
  };

  updateProfile = async (token, formValues) => {
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "USER-KEY": `${token}`
      }
    };

    try {
      const { data } = await axios.put(
        `${API_URL}/customer`,
        formValues,
        config
      );

      this.setState({ isLoading: false });
      const authToken = await retrieveAuthenticationToken();
      authToken ? await this.props.getCustomerInfo(authToken) : null;
      ToastAndroid.show(`Your Profile updated`, ToastAndroid.SHORT);
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error.response);
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

  _renderAddressForm = () => {
    const { handleSubmit } = this.props;
    const { name, mob_phone } = this.state.customerInfo;
    return (
      <KeyboardAvoidingView
        style={styles.containerStyle}
        enabled
        behavior="padding"
      >
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>
            {" "}
            Your Account Information :{" "}
          </Text>
        </View>
        <View style={styles.sectionStyleWhite}>
          <Field
            name="name"
            component={this._renderAddressInputs}
            label={name || "Your name"}
            type="text"
            validate={[required({ msg: "Your name is required" })]}
          />
          <Field
            name="email"
            component={this._renderAddressInputs}
            label={this.state.customerInfo.email || "email"}
            type="text"
            validate={[
              required({ msg: "Your email required" }),
              email({
                msg: "Please enter valid email (ex:yourname@example.com)"
              })
            ]}
          />
          <Field
            name="password"
            component={this._renderAddressInputs}
            label={"Password"}
            type="password"
            validate={[
              required({ msg: "password required" }),
              length({ min: 8, msg: "Password must be over 8 characters" })
            ]}
          />

          <Field
            name="mob_phone"
            component={this._renderAddressInputs}
            label={mob_phone || "Mobile Phone"}
            type="text"
          />

          <View style={{ padding: 20 }}>
            <Button
              containerStyle={{
                justifyContent: "flex-end",
                alignItems: "flex-end"
              }}
              onPress={handleSubmit(this.onSubmit)}
              title="Update"
              loading={this.state.isLoading}
              buttonStyle={{ backgroundColor: theme.primary }}
              rounded
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  render() {
    const { loggedIn } = this.props;
    return loggedIn ? this._renderAddressForm() : <Authenticate />;
  }
}

const mapStateToProps = state => {
  return { customerInfo: state.customer.result, loggedIn: state.loggedIn };
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.gray
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

const decoratedForm = reduxForm({ form: "EditProfile" })(EditProfile);
export default connect(
  mapStateToProps,
  { getCustomerInfo }
)(decoratedForm);
