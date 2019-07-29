import React, { Component } from "react";
import { Text, View } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { connect } from "react-redux";
// Order Related Components
import Address from "./Address";
import OrderReview from "./OrderReview";
import Payment from "./Payment";
import { theme } from "./../../color-themes";
import { DEVICE_HEIGHT } from "../../constants";
import Authenticate from "./../authentication/Authenticate";
import AuthSuccess from "./../authentication/AuthSuccess";
export class CheckoutWrapper extends Component {
  state = { errors: true };
  defaultScrollViewProps = {
    contentContainerStyle: {
      marginBottom: 60
    },
    nestedScrollEnabled: true
  };

  onAddressSubmitted = () => {
    this.setState({ errors: false });
  };

  render() {
    const { loggedIn } = this.props;
    console.log(loggedIn);
    return (
      <View style={{ flex: 1 }}>
        <ProgressSteps
          activeStepIconBorderColor={theme.primary}
          completedProgressBarColor={theme.primary}
          progressBarColor={theme.secondary}
          completedStepIconColor={theme.primary}
          disabledStepIconColor={theme.secondary}
          activeLabelColor={theme.primary}
          activeStepNumColor={theme.primary}
          completedProgressBarColor={theme.primary}
          labelColor={theme.secondary}
        >
          <ProgressStep
            label="ACCOUNT"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnStyle={{ padding: 3 }}
            nextBtnText="Continue"
            nextBtnTextStyle={{
              color: loggedIn ? theme.primary : theme.tertiary
            }}
            errors={!loggedIn}
          >
            {loggedIn ? <AuthSuccess /> : <Authenticate />}
          </ProgressStep>

          <ProgressStep
            label="SHIPPING"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnStyle={{ padding: 3 }}
            nextBtnText="Continue"
            errors={this.state.errors}
            nextBtnTextStyle={{
              color: this.state.errors ? theme.tertiary : theme.primary
            }}
          >
            <Address onAddressSubmitted={this.onAddressSubmitted} />
          </ProgressStep>
          <ProgressStep
            label="REVIEW"
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnStyle={{ padding: 3 }}
            nextBtnText="Checkout"
            previousBtnText="Address"
            nextBtnTextStyle={{ color: theme.primary }}
            previousBtnTextStyle={{ color: theme.primary }}
          >
            <View>
              <OrderReview {...this.props} />
            </View>
          </ProgressStep>
          <ProgressStep
            label="PAYMENT"
            previousBtnText="Review"
            finishBtnText="Pay Now"
            scrollViewProps={this.defaultScrollViewProps}
            previousBtnTextStyle={{ color: theme.primary }}
            nextBtnTextStyle={{ color: theme.primary }}
          >
            <View>
              <Payment {...this.props} />
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
export default connect(mapStateToProps)(CheckoutWrapper);
