import React, { Component } from "react";
import { Button, Card, Col, Flex, Form, Input, Row, Spin, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../storeDetails.css";
import Store from "./store";
import Account from "./account";
import GstDetails from "./gstDetails";

class StoreDetails extends Component {
  state = {
    isloading: false,
  };

  render() {
    return (
      <Spin spinning={this.state.isloading}>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col xs={24} lg={12}>
            <Store />
          </Col>
          <Col xs={24} lg={12}>
            <Account />
          </Col>
          <Col xs={24} lg={12}>
            <GstDetails />
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default StoreDetails;
