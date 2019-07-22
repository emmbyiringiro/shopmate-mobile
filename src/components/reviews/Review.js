import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-elements";
import { theme } from "../../color-themes";
import { DEVICE_WIDTH } from "../../constants";
import { excerpt } from "../../utils";

class Review extends Component {
  render() {
    const { name, review, rating } = this.props.item;

    return (
      <View style={styles.containerStyle}>
        <View>
          <Rating
            defaultRating={rating}
            readonly
            ratingCount={5}
            startingValue={rating}
            count={rating}
            imageSize={20}
            fractions={5}
          />
        </View>
        <View>
          <View style={styles.contentSectionStyle}>
            <Text style={styles.reviewTextStyle}>{excerpt(review, 20)}</Text>
          </View>
          <View style={styles.contentSectionStyle}>
            <Text style={styles.authorTextStyle}>{name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: DEVICE_WIDTH * 0.6,
    margin: 20
  },
  reviewTextStyle: { fontSize: 15, color: theme.secondary },
  authorTextStyle: { fontSize: 13, color: theme.tertiary },
  contentSectionStyle: { alignItems: "center", justifyContent: "center" }
});

export default Review;
