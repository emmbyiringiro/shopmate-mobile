/* - */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { Overlay, Button } from "react-native-elements";
import Authenticate from "./Authenticate";
import { theme } from "../../color-themes";

export default class AuthenticateModal extends Component {
  static propTypes = { isVisible: PropTypes.bool };
  static defaultProps = { isVisible: false };
  render() {
    const { isVisible, closeModal } = this.props;
    return (
      <Overlay isVisible={isVisible}>
        <View style={styles.container}>
          <Authenticate />
          <Button
            containerStyle={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 20
            }}
            onPress={closeModal}
            type="clear"
            title="Cancel"
            titleStyle={{ color: theme.secondary }}
          />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
