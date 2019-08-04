/* Component dispay loggedIn customer orders  and
 *  products in every order*/

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native";

import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { getCustomerOrders, getOrderProducts } from "../actions/order";
import {
  retrieveAuthenticationToken,
  removeAuthenticationToken
} from "../utils";
import { theme } from "../color-themes";

class CustomerOrders extends Component {
  state = { isCollapsed: false, activeOrder: null };

  static navigationOptions = {
    title: ` Orders`
  };
  async componentDidMount() {
    const authToken = await retrieveAuthenticationToken();

    if (authToken !== null) {
      await this.props.getCustomerOrders(authToken);
    }
  }

  handleToggle = async (isCollapsed, orderId) => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
      activeOrder: orderId
    });
    const authToken = await retrieveAuthenticationToken();

    if (authToken !== null && isCollapsed) {
      await this.props.getOrderProducts(authToken, orderId);
    }
  };

  _renderHeaders = () => {
    return (
      <View style={styles.headerStyle}>
        <View>
          <Text style={styles.headerTextStyle}> Number</Text>
        </View>
        <View>
          <Text style={styles.headerTextStyle}> Amount {"    "}</Text>
        </View>

        <View>
          <Text style={styles.headerTextStyle}>
            {" "}
            Order Date {"                "}
          </Text>
        </View>
      </View>
    );
  };
  _renderOrderItems = () => {
    const { currentOrder } = this.props;

    return (
      <View>
        <Text style={{ fontWeight: "bold" }}> Product(s) in this order :</Text>
        {currentOrder.map(order => (
          <OrderItems
            {...order}
            key={Math.random() + new Date().getMilliseconds()}
          />
        ))}
      </View>
    );
  };
  _renderCustomerOrders = () => {
    const {
      customerOrders,
      currentOrder,
      isFetchingProducts,
      isFetchingOrders,
      loggedIn
    } = this.props;
    const { isCollapsed, activeOrder } = this.state;

    if (isFetchingOrders) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      );
    } else if (!loggedIn) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text> Please log in your account to view your orders</Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Account");
            }}
            title="Sign In"
            type="clear"
            titleStyle={{ color: theme.primary }}
          />
        </View>
      );
    } else if (!customerOrders.length && !isFetchingProducts) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: theme.secondary }}>
            There's no information to show
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {customerOrders.map(order => (
          <Collapse
            isCollapsed={order.order_id === activeOrder}
            key={order.order_id}
            style={{ padding: 5 }}
            onToggle={isCollapsed => {
              this.handleToggle(isCollapsed, order.order_id);
            }}
          >
            <CollapseHeader style={styles.headerCollapseStyle}>
              <View>
                <Text
                  style={
                    activeOrder === order.order_id
                      ? styles.headerCollapseTextStyleActive
                      : styles.headerCollapseTextStyle
                  }
                >
                  {" "}
                  #{order.order_id}
                </Text>
              </View>
              <View>
                <Text
                  style={
                    activeOrder === order.order_id
                      ? styles.headerCollapseTextStyleActive
                      : styles.headerCollapseTextStyle
                  }
                >
                  {" "}
                  {order.total_amount} USD
                </Text>
              </View>

              <View>
                <Text
                  style={
                    activeOrder === order.order_id
                      ? styles.headerCollapseTextStyleActive
                      : styles.headerCollapseTextStyle
                  }
                >
                  {" "}
                  {formatDate(order.created_on)}
                </Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.bodyCollapseContainerStyle}>
              <View>
                {isFetchingProducts ? (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <ActivityIndicator color={theme.primary} size="small" />
                  </View>
                ) : (
                  <View>{this._renderOrderItems()}</View>
                )}
              </View>
            </CollapseBody>
          </Collapse>
        ))}
      </ScrollView>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this._renderHeaders()}
        {this._renderCustomerOrders()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerOrders: state.customerOrders.result,
    currentOrder: state.order.result,
    isFetchingProducts: state.order.isFetching,
    isFetchingOrders: state.customerOrders.isFetching,
    loggedIn: state.loggedIn
  };
};

const OrderItems = ({
  product_name,
  quantity,
  unit_cost,
  subtotal,
  attributes
}) => {
  return (
    <View style={styles.orderItemContainerStyle}>
      <Text style={styles.orderItemTextStyle}>
        {" "}
        Product Name : {product_name}
      </Text>
      <Text style={styles.orderItemTextStyle}>
        {" "}
        Product Quantity : {quantity}
      </Text>
      <Text style={styles.orderItemTextStyle}> Unit Price : $ {unit_cost}</Text>
      <Text style={styles.orderItemTextStyle}>
        {" "}
        Subtotal Price : $ {subtotal}
      </Text>
    </View>
  );
};
const formatDate = date => {
  date = String(date);
  const section1 = date.substring(0, 10);
  const section2 = date.substring(14, 19);

  return `${section1} at ${section2}`;
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.gray,
    padding: 20
  },

  headerCollapseStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  headerTextStyle: { fontWeight: "bold", fontSize: 13 },
  headerCollapseTextStyle: { color: "#333333", fontSize: 13 },
  headerCollapseTextStyleActive: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "600"
  },
  bodyCollapseContainerStyle: {
    margin: 5,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.secondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.secondary,
    backgroundColor: theme.gray
  },
  orderItemContainerStyle: {
    margin: 5,
    paddingBottom: 5
  },
  orderItemTextStyle: { color: "#333333", fontSize: 12 }
});

export default connect(
  mapStateToProps,
  { getCustomerOrders, getOrderProducts }
)(CustomerOrders);
