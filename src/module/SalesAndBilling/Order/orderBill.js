import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import UserService from "../../../service/customizeServices/UserManagements/userService";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import BillParentComponent from "../../CommonComponents/billParentComponent";
import OrderService from "../../../service/customizeServices/SalesAndBiling/OrderService";

class OrderBillClass extends BillParentComponent {
  userService = new UserService();
  service = new OrderService();
  updateUrl = "/sales-and-billing/order/history";
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form
          layout="vertical"
          onFinish={this.save}
          onValuesChange={(changedValues, allValues) => {
            const balanceAmount =
              (allValues.totalAmount || 0) - (allValues.advanceAmount || 0);
            this.form.setFieldsValue({
              balanceAmount,
            });
          }}
          ref={(formRef) => (this.form = formRef)}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} lg={16}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <Link to="/sales-and-billing/order/history">
                  <Flex>
                    <ArrowLeftOutlined />
                    <h3 style={{ color: "blue", paddingLeft: "5px" }}>Order</h3>
                  </Flex>
                </Link>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Row gutter={[5, 5]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[
                        {
                          required: true,
                          message: "Please select the status",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Select
                        options={[
                          { value: "Ordered", label: "Ordered" },
                          { value: "Pending", label: "Pending" },
                          { value: "Delivered", label: "Delivered" },
                          { value: "Canceled", label: "Canceled" },
                        ]}
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="totalAmount"
                      label="Total Amount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the total asmount",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input type="Number" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="advanceAmount"
                      label="Advance Amount"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the advance asmount",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input type="Number" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="balanceAmount"
                      label="Balance Amount"
                      className="form-input-tag-bottom-space"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the balance amount",
                        },
                      ]}
                    >
                      <Input
                        type="Number"
                        className="input-tag-style"
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="expectedDeliveryDate"
                      label="Expected Deliverydate"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the expected delivery date",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["user", "id"]}
                      label="Received By"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the received person",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Select
                        options={this.state?.salesManList?.map((e) => ({
                          label: e.username,
                          value: e.id,
                        }))}
                        placeholder="Sold By"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.List name="orderItems">
                      {(fields, { add, remove }) => (
                        <>
                          <Table
                            bordered
                            dataSource={fields}
                            pagination={false}
                            rowKey={(field) => field.key}
                            scroll={{
                              x: "min-content",
                            }}
                            columns={[
                              {
                                title: "Product Name",
                                dataIndex: "productName",
                                onCell: () => ({
                                  style: {
                                    textAlign: "right",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) => (
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "productName"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Enter Product Name",
                                      },
                                    ]}
                                    style={{ margin: 0 }}
                                  >
                                    <Input
                                      className="custom-select"
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                        backgroundColor: "white",
                                      }}
                                      placeholder="Product Name"
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: "Brand",
                                dataIndex: "brand",
                                onCell: () => ({
                                  style: {
                                    textAlign: "right",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) => (
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "brand"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Enter brand",
                                      },
                                    ]}
                                    style={{ margin: 0 }}
                                  >
                                    <Input
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                      placeholder="Brand"
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: "Variant",
                                dataIndex: "variant",
                                onCell: () => ({
                                  style: {
                                    textAlign: "right",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) => (
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "variant"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Enter variant",
                                      },
                                    ]}
                                    style={{ margin: 0 }}
                                  >
                                    <Input
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                      placeholder="Variant"
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: "Qty",
                                dataIndex: "quantity",
                                onCell: () => ({
                                  style: {
                                    textAlign: "right",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) => (
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "quantity"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Enter quantity",
                                      },
                                    ]}
                                    style={{ margin: 0 }}
                                    initialValue={1}
                                  >
                                    <Input
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                      placeholder="Quantity"
                                      type="number"
                                      min={1}
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: "Price",
                                dataIndex: "price",
                                onCell: () => ({
                                  style: {
                                    textAlign: "right",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) => (
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "price"]}
                                    style={{ margin: 0 }}
                                  >
                                    <Input
                                      placeholder="Price"
                                      type="number"
                                      style={{
                                        border: "none",
                                        boxShadow: "none",
                                      }}
                                    />
                                  </Form.Item>
                                ),
                              },
                              {
                                title: "Action",
                                dataIndex: "action",
                                onCell: () => ({
                                  style: {
                                    textAlign: "center",
                                    padding: "0px",
                                    margin: "0px",
                                  },
                                }),
                                render: (_, field) =>
                                  fields.length > 1 ? (
                                    <MinusCircleOutlined
                                      onClick={() => remove(field.name)}
                                      style={{ color: "red", fontSize: "16px" }}
                                    />
                                  ) : null,
                              },
                            ]}
                          />
                          <br />
                          <Flex justify="flex-end">
                            <Button
                              type="primary"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Add
                            </Button>
                          </Flex>
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <h3 style={{ color: "blue" }}>Customer Details</h3>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Row gutter={[5, 5]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "name"]}
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the name",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="Name" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "phoneNumber"]}
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
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={["customer", "email"]}
                      label="Email"
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="email"
                        placeholder="Email"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "dateOfBirth"]}
                      label="Date of Birth"
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "gstin"]}
                      label="GSTIN"
                      className="form-input-tag-bottom-space"
                    >
                      <Input className="input-tag-style" placeholder="GSTIN" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={["customer", "address"]}
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the address",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        placeholder="Address"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "state"]}
                      label="State"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the  state",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="State" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "pinCode"]}
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
                      />
                    </Form.Item>
                  </Col>
                  <Flex justify="end" style={{ width: "100%" }}>
                    <Button type="primary" htmlType="submit">
                      {this.state.mode === "add" ? "Submit" : "Update"}
                    </Button>
                  </Flex>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const OrderBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <OrderBillClass id={id} navigate={navigate} />;
};

export default OrderBill;
