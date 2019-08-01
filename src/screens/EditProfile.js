/*
 *  The component provide edit customer profile  capability
 *  and it update the following fields :
 *(1) name (2) email (3) password and (4) phone number
 */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import Authenticate from "../components/authentication/Authenticate";

import { required, email, numericality, length } from "redux-form-validators";
import axios from "axios";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { API_URL } from "../constants";
import { theme } from "../color-themes";
import { getCustomerInfo } from "../actions/services";
import { retrieveAuthenticationToken } from "../utils";

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
      await this.updateCustomerProfile(authToken, formValues);
    }
  };

  updateCustomerProfile = async (token, formValues) => {
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

      this.setState({ customerInfo: this.props.customerInfo });

      ToastAndroid.show(`Your Profile updated`, ToastAndroid.SHORT);
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error.response);
    }
  };
  _renderInputs = ({ label, input, meta: { touched, error } }) => {
    return (
      <Input
        {...input}
        placeholder={label}
        errorMessage={touched && error ? error : ""}
        secureTextEntry={label === "Password" ? true : false}
        inputStyle={{
          fontSize: 14
        }}
      />
    );
  };

  _renderForm = () => {
    const { handleSubmit } = this.props;
    const { name, mob_phone } = this.state.customerInfo;
    return (
      <KeyboardAvoidingView
        style={styles.containerStyle}
        enabled
        behavior="padding"
      >
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Your Account Information :</Text>
        </View>

        <View style={styles.sectionStyleWhite}>
          <Field
            name="name"
            component={this._renderInputs}
            label={name || "Your name"}
            type="text"
            validate={[required({ msg: "Your name is required" })]}
          />

          <Field
            name="email"
            component={this._renderInputs}
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
            component={this._renderInputs}
            label="Password"
            type="password"
            validate={[
              required({ msg: " Password required" }),
              length({ min: 8, msg: "Password must be over 8 characters" })
            ]}
          />

          <Field
            name="mob_phone"
            component={this._renderInputs}
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
    return loggedIn ? this._renderForm() : <Authenticate />;
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
