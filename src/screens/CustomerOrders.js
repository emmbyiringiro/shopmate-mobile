/* Component dispay loggedIn customer orders */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native";

import { connect } from "react-redux";

import { getCustomerOrders } from "../actions/order";
import {
  retrieveAuthenticationToken,
  removeAuthenticationToken
} from "../utils";
import { theme } from "../color-themes";

class CustomerOrders extends Component {
  async componentDidMount() {
    const authToken = await retrieveAuthenticationToken();

    if (authToken !== null) {
      await this.props.getCustomerOrders(authToken);
    }
  }
  _renderCustomerOrders = () => {
    const { customerOrders } = this.props;

    console.log(customerOrders);

    return (
      <View>
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

        {customerOrders.map(order => (
          <Collapse key={order.order_id} style={{ padding: 5 }}>
            <CollapseHeader style={styles.headerStyle}>
              <View>
                <Text style={styles.headerCollapseTextStyle}>
                  {" "}
                  #{order.order_id}
                </Text>
              </View>
              <View>
                <Text style={styles.headerCollapseTextStyle}>
                  {" "}
                  {order.total_amount} USD
                </Text>
              </View>

              <View>
                <Text style={styles.headerCollapseTextStyle}>
                  {" "}
                  {formatDate(order.created_on)}
                </Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.bodyCollapseContainerStyle}>
              <View>
                <Text style={styles.bodyCollapseTextStyle}>
                  Lorem Ipsum dol sit amen ......
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
        ))}
      </View>
    );
  };
  render() {
    return <View style={styles.container}>{this._renderCustomerOrders()}</View>;
  }
}

const mapStateToProps = state => {
  return { customerOrders: state.customerOrders.result };
};

const formatDate = date => {
  date = String(date);
  const section1 = date.substring(0, 10);
  const section2 = date.substring(14, 19);

  return `${section1} at ${section2}`;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerTextStyle: { fontWeight: "bold", fontSize: 12 },
  headerCollapseTextStyle: { color: "#333333", fontSize: 12 },
  bodyCollapseContainerStyle: { padding: 20 },
  bodyCollapseTextStyle: { color: "#999999", fontSize: 12 }
});

export default connect(
  mapStateToProps,
  { getCustomerOrders }
)(CustomerOrders);
