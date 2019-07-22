import React, { Component } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { theme } from "../../color-themes";
import ReviewNetworkError from "../NetworkErrors/ReviewNetworkError";
import Review from "./Review";

class ReviewsList extends Component {
  renderReviews = () => {
    if (this.props.isFetching) {
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
    } else if (this.props.fetchError) {
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
          data={this.props.productReviews}
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
