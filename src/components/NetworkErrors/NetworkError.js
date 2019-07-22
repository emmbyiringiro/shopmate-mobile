import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import { theme } from "./../../color-themes";
import { connect } from "react-redux";
import { getProducts } from "./../../actions/products";

class NetworkError extends React.Component {
  static defaultProps = {
    title: "Hmm....Something went Wrong",
    message:
      "Sorry, we can't get that information right now. Check your internet connection and try again",
    buttonSize: 30
  };
  render() {
    const { buttonSize, title, message } = this.props;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.sectionStyle}>
          <Text style={styles.mainTextStyle}>{title}</Text>
          <Text style={styles.secondaryTextStyle}>{message}</Text>
        </View>
        <View style={styles.sectionStyle}>
          <Button
            onPress={this.props.onRefresh}
            type="clear"
            icon={
              <Icon
                name="md-refresh-circle"
                size={buttonSize}
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
  sectionStyle: { marginTop: 20, paddingLeft: 20, paddingRight: 20 },
  mainTextStyle: { fontSize: 17, color: theme.secondary, fontWeight: "bold" },
  secondaryTextStyle: { color: theme.tertiary }
});
export default connect(
  null,
  { getProducts }
)(NetworkError);
