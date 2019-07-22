import React, { Component } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Button, Overlay, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { theme } from "./../../color-themes";
import { DEVICE_HEIGHT } from "./../../constants";
import NumericInput from "react-native-numeric-input";
import _ from "lodash";
import { updateProductInCart, addToCart } from "../../actions/cart";
import RadioButton from "../common/RadioButton";
import { getProductAttributes } from "../../actions/attributes";

class AddToCart extends Component {
  state = {
    colorAttribute: "White",
    sizeAttribute: "XL",
    currentSize: 1,
    currentColor: 1,
    productUnits: 1
  };

  componentDidMount() {
    const { product_id } = this.props;
    this.props.getProductAttributes(product_id);
  }
  closeModal = () => this.setState({ isVisible: false });

  renderSizeAttributes = () => {
    const { productAttributes } = this.props;
    const { currentSize } = this.state;
    const sizes = productAttributes.filter(
      attribute => attribute.attribute_name === "Size"
    );

    return sizes.map((size, index) => (
      <Button
        title={size.attribute_value}
        type="clear"
        key={index}
        titleStyle={{
          color: currentSize === index ? theme.primary : theme.tertiary
        }}
        onPress={() =>
          this.setState({
            sizeAttribute: size.attribute_value,
            currentSize: index
          })
        }
      />
    ));
  };

  renderColorAttributes = () => {
    const { productAttributes } = this.props;
    const colors = productAttributes.filter(
      attribute => attribute.attribute_name === "Color"
    );

    return colors.map((color, index) => (
      <RadioButton
        key={index}
        onPress={() =>
          this.setState({
            colorAttribute: color.attribute_value,
            currentColor: index
          })
        }
        selected={index === this.state.currentColor}
        style={{
          borderColor:
            color.attribute_value === "White"
              ? theme.gray
              : color.attribute_value.toLowerCase()
        }}
        selectedStyle={{
          backgroundColor:
            color.attribute_value === "White"
              ? theme.gray
              : color.attribute_value.toLowerCase()
        }}
      />
    ));
  };

  renderButtons = () => {
    const {
      product_id,
      isAddingToCart,
      cartId,
      name,
      addToCartError
    } = this.props;
    const { productUnits, sizeAttribute, colorAttribute } = this.state;

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
            let params = {
              cart_id: cartId,
              product_id,
              attributes: `${sizeAttribute},${colorAttribute}`
            };
            await this.props.addToCart(params);
            if (!addToCartError) {
              ToastAndroid.show(`${name} added to cart`, ToastAndroid.SHORT);
            }
          }}
          type="clear"
          title="ADD"
          titleStyle={{ color: theme.primary }}
          loading={isAddingToCart}
          icon={<Icon name="shopping-cart" color={theme.primary} size={20} />}
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
        height={(DEVICE_HEIGHT / 2) * 0.8}
      >
        <View>
          {this.renderItemName()}

          <View style={styles.sectionStyle}>{this.renderSizeAttributes()}</View>

          <View style={styles.sectionStyle}>
            {this.renderColorAttributes()}
          </View>
          {this.renderButtons()}
        </View>
      </Overlay>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAddingToCart: state.addToCart.isAddingToCart,
    addToCartError: state.addToCart.addToCartError,
    productAttributes: state.productAttributes.items,
    cartId: state.cartId.cartId
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
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  }
});

export default connect(
  mapStateToProps,
  { updateProductInCart, addToCart, getProductAttributes }
)(AddToCart);
