import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";

export default function RadioButton(props) {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="transparent">
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
          props.style
        ]}
      >
        {props.selected ? (
          <View
            style={[
              {
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#000"
              },
              props.selectedStyle
            ]}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
}
