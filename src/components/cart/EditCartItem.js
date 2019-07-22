import React, { Component } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "./../../color-themes";
import { DEVICE_HEIGHT } from "./../../constants";
import NumericInput from "react-native-numeric-input";
import _ from "lodash";
import { updateProductInCart } from "../../actions/cart";

class EditCartItem extends Component {
  state = { productUnits: 1 };

  closeModal = () => this.setState({ isVisible: false });

  renderProductQuantity = () => {
    return (
      <View style={styles.modalBodyStyle}>
        <NumericInput
          rounded
          value={Number(this.state.productUnits)}
          minValue={1}
          maxValue={99}
          onChange={value => this.setState({ productUnits: value })}
          borderColor={theme.tertiary}
        />
      </View>
    );
  };

  renderButtons = () => {
    const {
      item_id,
      name,
      updateProductInCart,
      isUpdating,
      updateProductError
    } = this.props;
    const { productUnits } = this.state;

    return (
      <View style={styles.modalFooter}>
        <Button
          onPress={() => this.props.toggleModal()}
          type="clear"
          title="CANCEL"
          titleStyle={{ color: theme.primary }}
        />

        <Button
          onPress={async () => {
            await updateProductInCart(item_id, productUnits);
            if (!updateProductError) {
              ToastAndroid.show(
                ` ${name} changed to ${productUnits} unit(s)`,
                ToastAndroid.SHORT
              );
            }
          }}
          type="clear"
          title=" UPDATE"
          loading={isUpdating}
          titleStyle={{ color: theme.primary }}
          disabled={this.state.validationError}
        />
      </View>
    );
  };

  renderItemName = () => {
    const { name } = this.props;
    return (
      <View style={styles.modalHeaderStyle}>
        <Text style={{ fontSize: 20, fontWeight: "700", fontWeight: "bold" }}>
          {name}
        </Text>
      </View>
    );
  };

  render() {
    const { item_id } = this.props;
    return (
      <Overlay
        animationType="fade"
        isVisible={this.props.modalOpen}
        height={(DEVICE_HEIGHT / 2) * 0.68}
      >
        <View>
          {this.renderItemName()}
          {this.renderProductQuantity()}

          {this.renderButtons()}
        </View>
      </Overlay>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUpdating: state.updateProductInCart.isUpdating,
    updateProductError: state.updateProductInCart.updateProductError
  };
};
const styles = StyleSheet.create({
  modalHeaderStyle: {
    backgroundColor: theme.gray,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.tertiary
  },
  modalBodyStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1,
    marginTop: 40,
    borderTopColor: theme.tertiary
  }
});

export default connect(
  mapStateToProps,
  { updateProductInCart }
)(EditCartItem);
