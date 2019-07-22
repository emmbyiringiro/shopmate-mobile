import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { DEVICE_WIDTH } from "./../../constants";
import { userSearchingProducts } from "./../../actions/services";

import { searchProducts, getProducts } from "./../../actions/products";

class Search extends React.Component {
  state = {
    search: ""
  };

  handleProductSearch = search => {
    const { isUserSearching, userSearchingProducts } = this.props;

    if (!isUserSearching) {
      userSearchingProducts();
    }
    this.setState({ search });
    this.props.searchProducts({ search });
  };

  render() {
    const { search } = this.state;
    const { isFetching, isUserSearching } = this.props;

    return (
      <SearchBar
        placeholder=" Notre Dame Cathedral..."
        onChangeText={this.handleProductSearch}
        value={search}
        platform="android"
        lightTheme
        showLoading={isFetching && isUserSearching}
        inputStyle={{ fontSize: 13 }}
        containerStyle={styles.containerStyle}
        onClear={() => {
          let params = { page: 1, limit: 10, description_length: 55 };
          this.props.getProducts("/products", params);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.products.isFetching,
    isUserSearching: state.isUserSearching
  };
};
const styles = StyleSheet.create({
  containerStyle: {
    width: DEVICE_WIDTH * 0.7,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5
  }
});
export default connect(
  mapStateToProps,
  { searchProducts, getProducts, userSearchingProducts }
)(Search);
