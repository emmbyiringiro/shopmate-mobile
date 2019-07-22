import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { theme } from "./../../color-themes";
import { connect } from "react-redux";
import { getProductReviews } from "./../../actions/products";

class ReviewNetworkError extends React.Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.sectionStyle}>
          <Text style={styles.mainTextStyle}>Hmm... reviews not available</Text>
          <Text style={styles.secondaryTextStyle}>
            Check your internet connection and try again.
          </Text>
        </View>
        <View style={styles.sectionStyle}>
          <Button
            onPress={() => this.props.getProductReviews(this.props.productId)}
            type="clear"
            rounded
            icon={
              <Icon
                name="md-refresh-circle"
                size={30}
                type="ionicon"
                color={theme.tertiary}
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: { flex: 1, alignItems: "center", justifyContent: "center" },
  sectionStyle: {
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20
  },
  mainTextStyle: { fontSize: 17, color: theme.secondary, fontWeight: "bold" },
  secondaryTextStyle: { color: theme.tertiary }
});
export default connect(
  null,
  { getProductReviews }
)(ReviewNetworkError);
