/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class EditProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the EditProfile component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
