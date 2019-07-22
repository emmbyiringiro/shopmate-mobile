import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { required, email, length } from "redux-form-validators";
import { Field, reduxForm } from "redux-form";
import { Button, Input } from "react-native-elements";
import axios from "axios";
import { CUSTOMER_SIGNUP_ENDPOINT } from "../../constants";
import { storeAuthenticationToken } from "../../utils";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/services";

import { theme } from "../../color-themes";

class SignupForm extends Component {
  state = { isFormSubmitting: false, error: "" };

  onSubmit = async formValues => {
    this.setState({ isFormSubmitting: true });
    try {
      const { data } = await axios.post(
        `${CUSTOMER_SIGNUP_ENDPOINT}`,
        formValues
      );
      // store authentication token
      const token = data.accessToken;
      storeAuthenticationToken(token, () => {
        this.props.authenticateUser(true);
      });
      this.props.console.log(data);
      this.setState({ isFormSubmitting: false });
    } catch (error) {
      this.setState({ isFormSubmitting: false });
      this.setState({ error: "Your email is arleady exist" });
    }
  };

  renderLoginForm = ({ label, name, input, meta: { touched, error } }) => {
    const { authenticateUser } = this.props;
    return (
      <Input
        {...input}
        placeholder={label}
        inputStyle={{ fontSize: 14 }}
        errorMessage={touched && error ? error : ""}
        secureTextEntry={label === "Password" ? true : false}
      />
    );
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}> Create Account </Text>
        </View>
        <View style={styles.sectionStyleWhitBorder}>
          <Field
            name="name"
            component={this.renderLoginForm}
            label="Full Name"
            type="text"
            validate={[required({ msg: "Please Provide Your Name" })]}
          />
          <Field
            name="email"
            component={this.renderLoginForm}
            label=" Active Email"
            type="text"
            validate={[
              required({ msg: "Please Provide Your Active Email" }),
              email({ msg: "Email you provide not valid" })
            ]}
          />

          <Field
            name="password"
            component={this.renderLoginForm}
            label="Password"
            type="password"
            validate={[
              required({ msg: " Password required" }),
              length({ min: 8, msg: "Password must be over 8 characters" })
            ]}
          />

          <View style={{ padding: 20 }}>
            <Button
              title="Signup Now"
              buttonStyle={{ backgroundColor: theme.primary }}
              onPress={this.props.handleSubmit(this.onSubmit)}
              loading={this.state.isFormSubmitting}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              height: 20,
              alignItems: "center"
            }}
          >
            <Text style={{ color: theme.primary }}> {this.state.error} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column"
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  sectionStyleWhitBorder: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: theme.secondary
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.gray,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: theme.secondary
  },

  headerTextStyle: { fontWeight: "700", fontSize: 16 }
});
const decoratedForm = reduxForm({ form: "signup" })(SignupForm);
export default connect(
  null,
  { authenticateUser }
)(decoratedForm);
