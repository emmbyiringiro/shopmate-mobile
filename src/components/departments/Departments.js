import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-native-elements";
import { DEVICE_WIDTH } from "./../../constants";
import { getProducts } from "./../../actions/products";
import { getCategories } from "./../../actions/categories";
import { theme } from "./../../color-themes";

export class Departments extends Component {
  state = { selectedIndex: null };

  updateIndex = selectedIndex => {
    let params = { page: 1, limit: 10, description_length: 55 };
    const departmendId = selectedIndex + 1;
    this.props.getProducts(`/products/inDepartment/${departmendId}`, params);
    this.props.getCategories(departmendId);
    this.setState({ selectedIndex });
  };

  renderButtonGroup = buttons => {
    if (!this.props.departments.length) {
      return null;
    }
    return (
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          buttons={[...buttons]}
          selectedIndex={this.state.selectedIndex}
          selectedButtonStyle={styles.selectedButtonStyle}
          containerStyle={{
            height: 20,
            width: DEVICE_WIDTH * 0.9,
            margin: 20
          }}
        />
      </View>
    );
  };
  render() {
    const buttons = this.props.departments.map(department => department.name);
    return this.renderButtonGroup(buttons);
  }
}

const mapStateToProps = state => {
  return { departments: state.departments.items };
};

const styles = StyleSheet.create({
  selectedButtonStyle: { backgroundColor: theme.primary }
});
export default connect(
  mapStateToProps,
  { getProducts, getCategories }
)(Departments);
