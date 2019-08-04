import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import AddToCart from "../cart/AddToCart";

import { connect } from "react-redux";

import { theme } from "./../../color-themes";
import { thumToImage } from "./../../utils";
import { getProductReviews } from "../../actions/reviews";
import { DEVICE_WIDTH, IMG_URL_ENDPOINT } from "./../../constants";

class Product extends Component {
  state = { isAddedToCart: false, modalOpen: false };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  render() {
    const {
      product_id,
      name,
      thumbnail,
      price,
      description,
      discounted_price,
      inCart
    } = this.props;

    return (
      <View>
        <AddToCart
          {...this.props}
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
        />
        <TouchableHighlight
          onPress={() => {
            this.props.getProductReviews(product_id);
            this.props.navigation.navigate("ProductDetails", {
              ...this.props
            });
          }}
          underlayColor={theme.gray}
        >
          <Card
            containerStyle={styles.productCardStyle}
            title={name}
            image={{
              uri: `${IMG_URL_ENDPOINT}${thumToImage(thumbnail)}`
            }}
            imageProps={{ resizeMode: "contain" }}
          >
            <View>
              <Text>{description}</Text>
            </View>
            <View style={styles.cardFooterStyle}>
              <Text style={styles.discountedPriceStyle}>
                $ {discounted_price}
              </Text>
              <Text style={styles.regularPriceStyle}>$ {price}</Text>

              <Button
                type="clear"
                onPress={() => {
                  this.toggleModal();
                }}
                icon={
                  <Icon
                    name="add-shopping-cart"
                    size={22}
                    color={theme.primary}
                  />
                }
              />
            </View>
          </Card>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { cartId: state.cartId.cartId };
};
const styles = StyleSheet.create({
  productCardStyle: {
    flexDirection: "column",
    width: Math.round((DEVICE_WIDTH / 2) * 0.95),
    margin: 3,
    marginBottom: 3,
    borderWidth: 0
  },
  cardFooterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 8
  },
  regularPriceStyle: {
    fontSize: 12,
    color: theme.secondary,
    textDecorationLine: "line-through"
  },
  discountedPriceStyle: {
    fontSize: 13,
    color: theme.primary,
    fontWeight: "700"
  }
});

export default connect(
  mapStateToProps,
  { getProductReviews }
)(Product);
