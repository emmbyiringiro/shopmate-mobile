import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import { Card, Icon, Image, Button } from "react-native-elements";
import { removeProductInCart, getProductInCart } from "./../../actions/cart";
import EditCartItem from "./EditCartItem";
import { theme } from "./../../color-themes";

class CartItem extends Component {
  state = { modalOpen: false, isRemovingToCart: false };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  renderSizeandColor = () => {
    const { attributes } = this.props;

    return (
      <View
        style={[
          styles.cartContentSectionStyle,
          { justifyContent: "center", marginBottom: 3 }
        ]}
      >
        <View style={styles.attributeStyle}>
          <Text>Size : </Text>
          <Text style={{ fontWeight: "700" }}>{attributes.split(",")[0]}</Text>
        </View>
        <View style={styles.attributeStyle}>
          <Text>Color : </Text>
          <Text style={{ fontWeight: "700" }}> {attributes.split(",")[1]}</Text>
        </View>
      </View>
    );
  };

  renderPriceAndQuantity = () => {
    const { price, quantity } = this.props;
    return (
      <View>
        <View
          style={[
            styles.cartContentSectionStyle,
            {
              justifyContent: "center",
              marginBottom: 3,
              fontWeight: "600",
              color: theme.black
            }
          ]}
        >
          <View style={styles.attributeStyle}>
            <Text>Price : </Text>
            <Text style={{ fontWeight: "700" }}> $ {price}</Text>
          </View>
          <View style={styles.attributeStyle}>
            <Text>Quantity : </Text>
            <Text style={{ fontWeight: "700" }}>{quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderItemName = () => {
    const { name } = this.props;
    return (
      <View style={styles.cartContentSectionStyle}>
        <Text style={styles.itemNameStyle}>{name}</Text>
        <Text>{"   "}</Text>
        <View>
          {/** Edit button - button use same flex layout with cart
           **  that's why wrapped in one function */}
          <Button
            onPress={() => this.toggleModal()}
            type="clear"
            icon={
              <Icon
                name="edit"
                size={20}
                type="font-awesome"
                color={theme.secondary}
              />
            }
          />
        </View>
      </View>
    );
  };

  renderItemThumbnail = () => {
    // Products  in cart response object don't contain
    // image, I rised new issue to  add it
    //******************************************
    // const { image } = this.props;
    // const IMG_ROOT_URL = "https://backendapi.turing.com/images/products/";
    // let imgUrl = IMG_ROOT_URL + image;
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../../assets/corsica.png")}
          style={{ width: 80, height: 80 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    );
  };

  renderItemTotal = () => {
    const {
      product_id,
      name,
      quantity,
      subtotal,
      price,
      item_id,
      cartId,
      isRemovingToCart,
      removeToCartError
    } = this.props;
    return (
      <View style={styles.cartContentSectionStyle}>
        <View style={styles.attributeStyle}>
          <Text>Total : </Text>

          <Text style={{ fontWeight: "700", color: theme.primary }}>
            $ {subtotal}
          </Text>
        </View>
        <View>
          {/** remove  item (trash ) button - button use same flex layout with Price
           **   and that's use wrapped in one function */}
          <Button
            type="clear"
            icon={
              <Icon
                name="trash"
                size={20}
                type="font-awesome"
                color={theme.secondary}
              />
            }
            onPress={async () => {
              this.setState({ isRemovingToCart: true });
              await this.props.removeProductInCart(item_id, cartId);
              if (!removeToCartError) {
                ToastAndroid.show(
                  `${name} removed to cart`,
                  ToastAndroid.SHORT
                );
              }

              if (this.mounted) {
                this.setState({
                  isRemovingToCart: false
                });
              }
            }}
            loading={this.state.isRemovingToCart}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Card containerStyle={styles.cardWrapperStyle}>
          <View style={styles.cartContainerStyle}>
            {this.renderItemThumbnail()}
            <View style={styles.cartContentStyle}>
              {this.renderItemName()}
              {this.renderSizeandColor()}
              {this.renderPriceAndQuantity()}
              {this.renderItemTotal()}
            </View>

            {/*  Cart content end*/}
          </View>
        </Card>
        <EditCartItem
          {...this.props}
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartId: state.cartId.cartId,
    isRemovingToCart: state.removeToCart.isRemovingToCart,
    removeToCartError: state.removeToCart.removeToCartError
  };
};
const styles = StyleSheet.create({
  cartContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  cartContentStyle: { flex: 1, flexDirection: "column" },
  cartContentSectionStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingLeft: 15
  },
  cartButtonStyle: {
    alignSelf: "stretch",
    right: 2
  },
  itemNameStyle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.primary
  },
  attributeStyle: { flex: 1, flexDirection: "row" },

  cardWrapperStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: theme.tertiary
  }
});
export default connect(
  mapStateToProps,
  { removeProductInCart, getProductInCart }
)(CartItem);
