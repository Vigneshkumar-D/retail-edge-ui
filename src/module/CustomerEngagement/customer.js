import TableParentPage from "../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import CustomerService from "../../service/customizeServices/CustomerEngagement/customer";
import { DateFormat } from "../../service/defaultServices/formates";

import { UserAddOutlined } from "@ant-design/icons";
import React from "react";
import View from "../../component/viewButton";
import TextArea from "antd/es/input/TextArea";
const { Paragraph } = Typography;

class Customer extends TableParentPage {
  service = new CustomerService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [
        {
          id: 0,
          category: "string",
        },
      ],
      formOpen: false,
      mode: null,
      id: null,
    };
  }
  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (e) => e || "-",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (e) => e || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (e) => e || "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "250px",
      render: (e) => (
        <Paragraph
          ellipsis={{
            rows: 1,
            expandable: true,
            symbol: "more",
          }}
        >
          {e || "-"}
        </Paragraph>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      fixed: "right",
      render: (e) => {
        return (
          <>
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <Edit
              onClickFn={() => {
                this.editForm(e);
              }}
            />
            <View onClickFn={() => this.viewForm(e)} />
          </>
        );
      },
    },
  ];
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Customer</h2>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ formOpen: true, mode: "add" });
            }}
            icon={<UserAddOutlined />}
          >
            Add
          </Button>
        </Flex>
        <br />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#bdbdd7",
              },
            },
          }}
        >
          <Table
            dataSource={this.state.data}
            columns={this.columns}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>
        <Modal
          title="Customer"
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            ref={this.formRef} // Attach form reference
            name="form_item_path"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the name",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    placeholder="Name"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phoneNumber",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  className="form-input-tag-bottom-space"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    className="input-tag-style"
                    format="YYYY-MM-DD"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="GSTIN"
                  label="GSTIN"
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    className="input-tag-style"
                    placeholder="GSTIN"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the address",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <TextArea
                    placeholder="Address"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the  state",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    placeholder="State"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="pinCode"
                  label="Pincode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the pincode",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    placeholder="Pincode"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
                  <Button type="primary" htmlType="submit">
                    {this.state.mode == "add" ? "Add" : "Update"}
                  </Button>
                </Flex>
              )}
            </Row>
          </Form>
        </Modal>
      </Spin>
    );
  }
}

export default Customer;
