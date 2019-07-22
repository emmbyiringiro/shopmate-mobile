import React, { Component } from "react";
import { View, Text, ActivityIndicator, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import Grid from "react-native-grid-component";
import { getProducts } from "./../../actions/products";
import { generateCartId } from "../../actions/cart";
import Product from "./Product";
import NetworkError from "./../NetworkErrors/NetworkError";
import { theme } from "./../../color-themes";
import { SHOPMATE_CART_ID, API_URL } from "../../constants";
import store from "../../store";
import { GET_CART_ID_LOCAL } from "../../actions/cart/types";

class ProductList extends Component {
  async componentDidMount() {
    // Fetch Products
    let params = { page: 1, limit: 10, description_length: 55 };
    this.props.getProducts("/products", params);
    // Generate Cart ID if not available on user device
    let cartId = await AsyncStorage.getItem(`${SHOPMATE_CART_ID}`);

    console.log(cartId);

    if (cartId === null) {
      this.props.generateCartId();
    }

    store.dispatch({ type: GET_CART_ID_LOCAL, cartId });
  }

  renderProducts = () => {
    const { products, isFetching, fetchError, isUserSearching } = this.props;
    if (isFetching) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator color={theme.primary} size="large" />
        </View>
      );
    } else if (fetchError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <NetworkError
            onRefresh={() => {
              let params = { page: 1, limit: 10, description_length: 55 };
              this.props.getProducts("/products", params);
            }}
            title="You're not connected"
          />
        </View>
      );
    } else if (products.length === 0 && isUserSearching) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text> No product(s) found</Text>
        </View>
      );
    }
    return (
      <Grid
        style={{ flex: 1, margin: 2, backgroundColor: theme.gray }}
        keyExtractor={item => item.product_id}
        data={this.props.products}
        itemsPerRow={2}
        numColumns={2}
        renderItem={item => <Product {...item} {...this.props} />}
      />
    );
  };
  render() {
    return this.renderProducts();
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.items,
    cart: state.cart,
    fetchError: state.products.fetchError,
    isFetching: state.products.isFetching,
    isUserSearching: state.isUserSearching
  };
};

export default connect(
  mapStateToProps,
  { getProducts, generateCartId }
)(ProductList);
