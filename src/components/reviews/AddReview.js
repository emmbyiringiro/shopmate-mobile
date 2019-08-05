import React, { Component } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Input, Rating, Button } from "react-native-elements";

import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import { retrieveAuthenticationToken } from "../../utils";
import { API_URL } from "../../constants";
import { getProductReviews } from "./../../actions/reviews";
import { theme } from "../../color-themes";

class AddReview extends Component {
  static propTypes = { productId: PropTypes.number };

  state = { rating: 2, review: "", isSubmitting: false, errorMessage: null };
  ratingComplete = rating => {
    this.setState({ rating });
  };

  onSubmit = async () => {
    const { productId } = this.props;
    const { rating, review } = this.state;
    const product_id = productId;
    // a helper function which retrieve JWToken stored
    //on  user device and use it to authenticate user
    const token = await retrieveAuthenticationToken();

    if (token !== null) {
      const params = { product_id, review, rating };
      this.setState({ isSubmitting: true, review: "" });
      await this.submitReview(
        params,
        token,
        // callback when  add review resolved
        () => {
          this.setState({ isSubmitting: false });
          // Notify customer that review received
          ToastAndroid.show(`Thanks for your feedback `, ToastAndroid.SHORT);
          // Get fresh new reviews which new added review
          this.props.getProductReviews(product_id);
        },
        // callback when  add review rejected
        errorMessage => {
          this.setState({ isSubmitting: false, errorMessage });
        }
      );
    }
  };
  submitReview = async (
    { product_id, review, rating },
    token,
    resolve,
    reject
  ) => {
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "USER-KEY": `${token}`
      }
    };

    try {
      const response = await axios.post(
        `${API_URL}/products/${product_id}/reviews`,
        { product_id, review, rating },
        config
      );

      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  };
  render() {
    const { errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <Rating
          ratingCount={5}
          imageSize={20}
          onFinishRating={this.ratingComplete}
        />
        <Input
          keyboardType="visible-password"
          label=" Add Review"
          labelStyle={{ fontSize: 15, color: theme.primary }}
          placeholder="write your review..."
          inputStyle={{ fontSize: 14 }}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => this.setState({ review: text })}
          value={this.state.review}
        />
        <View>
          {errorMessage ? (
            <View>
              <Text>{errorMessage}</Text>
            </View>
          ) : null}
          <Button
            containerStyle={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 20
            }}
            onPress={this.onSubmit}
            type={this.state.isSubmitting ? "clear" : "solid"}
            title="Add Review"
            iconRight
            buttonStyle={{
              backgroundColor: this.state.isSubmitting
                ? "transparent"
                : theme.primary
            }}
            loading={this.state.isSubmitting}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default connect(
  null,
  { getProductReviews }
)(AddReview);
