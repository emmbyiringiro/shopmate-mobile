import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-native-elements";
import { DEVICE_WIDTH } from "./../../constants";
import { getProducts } from "./../../actions/products";
import { theme } from "./../../color-themes";

export class Categories extends Component {
  state = { selectedIndex: null };

  handleButtonPress = selectedIndex => {
    let params = { page: 1, limit: 10, description_length: 55 };
    this.props.getProducts(`/products/inCategory/${selectedIndex + 1}`, params);
    this.setState({ selectedIndex });
  };

  renderButtonGroup = buttons => {
    if (!this.props.categories.length) {
      return null;
    }
    return (
      <View>
        <ButtonGroup
          onPress={this.handleButtonPress}
          buttons={[...buttons]}
          selectedIndex={this.state.selectedIndex}
          selectedButtonStyle={styles.selectedButtonStyle}
          containerStyle={{ height: 20, width: DEVICE_WIDTH * 0.9 }}
        />
      </View>
    );
  };

  render() {
    const buttons = this.props.categories.map(department => department.name);
    return this.renderButtonGroup(buttons);
  }
}

const mapStateToProps = state => {
  return { categories: state.categories.items };
};

const styles = StyleSheet.create({
  selectedButtonStyle: { backgroundColor: theme.primary }
});
export default connect(
  mapStateToProps,
  { getProducts }
)(Categories);
