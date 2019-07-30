import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Image, withBadge } from "react-native-elements";
import { Constants } from "expo";
import { AppDrawerNavigator } from "../../navigation";
import { connect } from "react-redux";
import { DEVICE_WIDTH } from "./../../constants";

class Header extends React.Component {
  render() {
    const { cart } = this.props;
    const BadgedIcon = cart.length ? withBadge(cart.length)(Icon) : Icon;

    return (
      <View style={styles.containerStyle}>
        <View>
          <Button
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
            type="clear"
            icon={<Icon name="bars" platform="android" type="antdesign" />}
          />
        </View>
        <View>
          <Image
            source={require("./../../assets/shopmate-logo.png")}
            style={{ width: 120, height: 50 }}
            resizeMode="contain"
          />
        </View>

        <View>
          <Button
            onPress={() => this.props.navigation.navigate("Cart")}
            type="clear"
            icon={<BadgedIcon name="shoppingcart" type="antdesign" />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: Constants.statusBarHeight
  },
  BadgedIconStyle: {
    flex: 0,
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return { cart: state.cart.result };
};
export default connect(mapStateToProps)(Header);
