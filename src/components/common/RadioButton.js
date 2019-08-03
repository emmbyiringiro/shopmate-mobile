import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";
import PropTypes from "prop-types";

export default class RadioButton extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    style: PropTypes.object,
    selectedStyle: PropTypes.object,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { onPress, style, selected, selectedStyle } = this.props;
    return (
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <View
          style={[
            {
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#000",
              alignItems: "center",
              justifyContent: "center"
            },
            style
          ]}
        >
          {selected ? (
            <View
              style={[
                {
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#000"
                },
                selectedStyle
              ]}
            />
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}
