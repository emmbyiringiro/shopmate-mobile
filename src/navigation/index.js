import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import Store from "../screens/Store";
import Cart from "../screens/Cart";
import ProductDetails from "../screens/ProductDetails";
import Checkout from "../screens/Checkout";
import { DEVICE_WIDTH } from "../constants";
import Account from "../screens/Account";

const AppStackNavigator = createStackNavigator({
  Store: { screen: Store },
  Checkout: { screen: Checkout },
  ProductDetails: { screen: ProductDetails },
  Checkout: { screen: Checkout },
  Cart: { screen: Cart }
});

const drawerConfig = {
  drawerWidth: DEVICE_WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return <Account />;
  }
};
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppStackNavigator }
  },
  drawerConfig
);

const AppContainer = createAppContainer(AppDrawerNavigator);
export default AppContainer;
