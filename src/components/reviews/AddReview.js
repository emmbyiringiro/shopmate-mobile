/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Rating, Button } from "react-native-elements";
import { theme } from "../../color-themes";
import axios from "axios";
import { retrieveAuthenticationToken } from "../../utils";
import { API_URL } from "../../constants";

export default class AddReview extends Component {
  state = { rating: 2, review: "", isSubmitting: false, errorMessage: null };
  ratingComplete = rating => {
    this.setState({ rating });
  };

  onSubmit = async () => {
    this.setState({ isSubmitting: true });
    const { productId } = this.props;
    const { rating, review } = this.state;
    const product_id = productId;
    // a helper function which retrieve JWToken stored
    //on  user device and use it to authenticate user
    const token = await retrieveAuthenticationToken();

    if (token !== null) {
      const params = { product_id, review, rating };
      await this.submitReview(
        params,
        token,
        // callback when  add review succeed
        () => {
          this.setState({ isSubmitting: false });
        },
        // callback when  add review failure
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
    } catch ({ response }) {
      const errorMessage = response.error.message;
      reject(errorMessage);
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
          label=" Add Review"
          labelStyle={{ fontSize: 15, color: theme.primary }}
          placeholder="Cool shirt bro..."
          inputStyle={{ fontSize: 14 }}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => this.setState({ review: text })}
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
            type="solid"
            title="Add Review"
            iconRight
            buttonStyle={{
              backgroundColor: theme.primary
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
