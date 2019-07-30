import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { required, email, length } from "redux-form-validators";
import { Field, reduxForm } from "redux-form";
import { Button, Input, Icon } from "react-native-elements";
import axios from "axios";
import { CUSTOMER_LOGIN_ENDPOINT } from "../../constants";
import { storeAuthenticationToken } from "../../utils";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/services";

import { theme } from "../../color-themes";

class LoginForm extends Component {
  state = { isSubmitting: false, isSubmitted: false, error: "" };
  onSubmit = async formValues => {
    this.setState({ isSubmitting: true, error: "" });
    try {
      const { data, status } = await axios.post(
        `${CUSTOMER_LOGIN_ENDPOINT}`,
        formValues
      );

      // store authentication token
      const token = data.accessToken;
      storeAuthenticationToken(token, () => {
        this.props.authenticateUser(true);
      });

      this.setState({ isSubmitted: true });
      this.setState({ isSubmitting: false });
    } catch ({ response }) {
      this.setState({ isSubmitting: false });

      if (response.status === 400) {
        this.setState({ error: "Invalid username or password" });
      }
      if (response.status === 500) {
        this.setState({ error: "Something went wrong" });
      }
    }
  };

  renderLoginInputs = ({ label, name, input, meta: { touched, error } }) => {
    return (
      <Input
        {...input}
        placeholder={label}
        errorMessage={touched && error ? error : ""}
        secureTextEntry={label === "Password" ? true : false}
        inputStyle={{ fontSize: 14 }}
      />
    );
  };

  renderLoginForm = () => {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>
            {" "}
            Login with Email and Password{" "}
          </Text>
        </View>
        <View style={styles.sectionStyleWhitBorder}>
          <Field
            name="email"
            component={this.renderLoginInputs}
            label="Email"
            type="text"
            validate={[
              required({ msg: "Please Provide Your Active Email" }),
              email({ msg: "Email you provide not valid" })
            ]}
          />

          <Field
            name="password"
            component={this.renderLoginInputs}
            label="Password"
            type="password"
            validate={[
              required({ msg: " Password required" }),
              length({ min: 8, msg: "Password must be over 8 characters" })
            ]}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            onPress={handleSubmit(this.onSubmit)}
            title="Login"
            buttonStyle={{ backgroundColor: theme.primary }}
            loading={this.state.isSubmitting}
          />
          <View
            style={[
              styles.sectionStyle,
              { justifyContent: "center", height: 20 }
            ]}
          >
            <Text style={{ color: theme.primary }}> {this.state.error} </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { isSubmitted } = this.state;
    return this.renderLoginForm();
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

const decoratedForm = reduxForm({ form: "login" })(LoginForm);
export default connect(
  null,
  { authenticateUser }
)(decoratedForm);
