import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
import ReviewNetworkError from "../NetworkErrors/ReviewNetworkError";
import Review from "./Review";

class ReviewsList extends Component {
  renderReviews = () => {
    const { isFetching, fetchError, productReviews } = this.props;
    if (isFetching) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <ActivityIndicator color={theme.primary} />
        </View>
      );
    } else if (!productReviews.length) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <Text>
            No reviews available . Be the first to review this product
          </Text>
        </View>
      );
    } else if (fetchError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ReviewNetworkError productId={this.props.productId} />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          horizontal
          data={productReviews}
          renderItem={item => <Review {...item} />}
          keyExtractor={item => item.created_on.toString()}
          style={{ paddingEnd: 10, paddingBottom: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  render() {
    return <View>{this.renderReviews()}</View>;
  }
}
const mapStateToProps = state => {
  return {
    productReviews: state.reviews.items,
    fetchError: state.reviews.fetchError,
    isFetching: state.reviews.isFetching
  };
};
export default connect(mapStateToProps)(ReviewsList);
