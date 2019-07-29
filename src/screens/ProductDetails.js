import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { Image, Rating, Button, Icon } from "react-native-elements";
import RadioButton from "../components/common/RadioButton";
import { connect } from "react-redux";

import {
  DEVICE_WIDTH,
  IMG_URL_ENDPOINT,
  SHOPMATE_CART_ID
} from "./../../src/constants";
import { thumToImage, thumToImage2, validateQuantity } from "./../../src/utils";
import { theme } from "./../color-themes";
import { addToCart } from "./../actions/cart/";
import { getProductAttributes } from "../actions/attributes";
import ReviewsList from "../components/reviews/ReviewsList";
import NumericInput from "react-native-numeric-input";

import CartTotals from "./../components/cart/CartTotals";

class ProductDetails extends Component {
  state = {
    colorAttribute: "Red",
    sizeAttribute: "XL",
    currentSize: 1,
    currentColor: 1
  };

  static navigationOptions = {
    title: `Product Details`,
    headerRight: <CartTotals />
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { product_id } = navigation.state.params;

    this.props.getProductAttributes(product_id);

    const cartId = await AsyncStorage.getItem(`${SHOPMATE_CART_ID}`);
    if (cartId !== null) {
      this.setState({ cartId: cartId });
    }
  }
  averageRating = reviews => {
    if (reviews.length === 0) {
      return 0;
    }
    return reviews
      .map(review => review.rating)
      .reduce((total, rating) => total + rating / reviews.length);
  };

  renderProductDescription = () => {
    const { navigation } = this.props;
    const { description } = navigation.state.params;
    return (
      <View
        style={{
          padding: 20
        }}
      >
        <Text>{description}</Text>
      </View>
    );
  };
  renderProductImages = () => {
    const { navigation } = this.props;
    const { thumbnail } = navigation.state.params;

    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View>
          <Image
            source={{ uri: `${IMG_URL_ENDPOINT}${thumToImage(thumbnail)}` }}
            style={styles.imageStyle}
            imageProps={{ resizeMode: "contain" }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <View>
          <Image
            source={{
              uri: `${IMG_URL_ENDPOINT}${thumToImage2(thumbnail)}`
            }}
            style={styles.imageStyle}
            imageProps={{ resizeMode: "contain" }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </View>
    );
  };
  renderTransactionButtons = () => {
    const { navigation, isAddingToCart } = this.props;
    const { product_id, name } = navigation.state.params;
    const { colorAttribute, sizeAttribute, cartId } = this.state;
    if (this.state.inCart) {
      return (
        <View>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Checkout");
            }}
            type="solid"
            title="Checkout"
            iconRight
            buttonStyle={{
              backgroundColor: theme.black
            }}
            icon={<Icon name="navigate-next" color={theme.white} size={20} />}
          />
        </View>
      );
    }

    return (
      <View>
        <Button
          onPress={async () => {
            let params = {
              cart_id: cartId,
              product_id,
              attributes: `${sizeAttribute},${colorAttribute}`
            };
            await this.props.addToCart(params);
            ToastAndroid.show(`${name}  added to cart`, ToastAndroid.SHORT);
          }}
          type="solid"
          title="Add To Cart"
          disabled={this.state.validationError}
          loading={isAddingToCart}
          buttonStyle={{
            backgroundColor: theme.black
          }}
          icon={<Icon name="add-shopping-cart" color={theme.white} size={20} />}
        />
      </View>
    );
  };

  renderContinueShoppingButton = () => {
    return (
      <Button
        onPress={() => this.props.navigation.navigate("Store")}
        type="clear"
        icon={<Icon name="add-circle-outline" size={40} />}
      />
    );
  };

  renderProductName = () => {
    const { navigation } = this.props;
    const { name } = navigation.state.params;

    return (
      <View>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
    );
  };

  renderProductPricing = () => {
    const { navigation } = this.props;
    const { discounted_price, price } = navigation.state.params;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.discountPriceStyle}> ${discounted_price}</Text>
        <Text> </Text>
        <Text style={styles.reguralPriceStyle}>${price}</Text>
      </View>
    );
  };

  renderAverageRating = () => {
    const { reviews } = this.props;

    if (!this.props.reviews.length) {
      return null;
    }

    return (
      <View style={styles.sectionStyle}>
        <View
          style={[styles.sectionStyleWhite, { padding: 5, borderRadius: 10 }]}
        >
          <Rating
            startingValue={this.averageRating(reviews)}
            count={this.averageRating(reviews)}
            ratingCount={5}
            readonly
            imageSize={20}
          />
        </View>
        <Text>{reviews.length ? `${reviews.length} reviews` : ""}</Text>
      </View>
    );
  };

  renderProductAttributes = () => {
    return (
      <View>
        <View style={styles.sectionStyle}>
          {this.renderProductName()}
          {this.renderProductPricing()}
        </View>
        {this.renderAverageRating()}
      </View>
    );
  };

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
  render() {
    const { navigation } = this.props;
    const { product_id } = navigation.state.params;

    return (
      <ScrollView style={styles.containerStyle}>
        {this.renderProductImages()}
        {this.renderProductAttributes()}

        <View style={[styles.sectionStyle, { justifyContent: "space-around" }]}>
          {this.renderSizeAttributes()}
        </View>
        <View style={[styles.sectionStyle, { justifyContent: "space-around" }]}>
          {this.renderColorAttributes()}
        </View>
        {this.renderProductDescription()}
        <View style={[styles.sectionStyle, { alignItems: "center" }]}>
          {this.renderContinueShoppingButton()}
          {this.renderTransactionButtons()}
        </View>
        <View style={styles.sectionStyleWhite}>
          <ReviewsList productId={product_id} />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews.items,
    isAddingToCart: state.addToCart.isAddingToCart,
    productAttributes: state.productAttributes.items
  };
};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column"
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },

  sectionStyleWhite: {
    padding: 10,
    backgroundColor: theme.white,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: theme.secondary
  },
  discountPriceStyle: { fontSize: 16, fontWeight: "700", color: theme.primary },
  reguralPriceStyle: {
    fontSize: 12,
    color: theme.secondary,
    textDecorationLine: "line-through"
  },
  imageStyle: {
    width: DEVICE_WIDTH / 2,
    height: DEVICE_WIDTH / 2
  },
  textStyle: { fontWeight: "700", fontSize: 17 }
});
export default connect(
  mapStateToProps,
  {
    addToCart,

    getProductAttributes
  }
)(ProductDetails);
