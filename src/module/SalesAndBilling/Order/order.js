import TableParentPage from "../../../component/tableParentPage";
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
  Select,
  Spin,
  Table,
} from "antd";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";
import OrderService from "../../../service/customizeServices/SalesAndBiling/OrderService";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { FaList } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { DateFormat } from "../../../service/defaultServices/formates";
import { Link, useNavigate, useParams } from "react-router-dom";

class Order extends TableParentPage {
  service = new OrderService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      productData: [],
      formOpen: false,
      mode: null,
      id: null,
      formOpenProductList: false,
    };
  }

  columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (e, record) => `${e?.name}` || "-",
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e?.phoneNumber || "-",
    },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (e) => e || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Advance",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Balance Amount",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },

    {
      title: "Order Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (e) => DateFormat(e) || "-",
    },
    {
      title: "Delivery",
      dataIndex: "expectedDeliveryDate",
      key: "expectedDeliveryDate",
      render: (e) => DateFormat(e) || "-",
    },
    {
      title: "Order Items",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e) => (
        <Button
          className="editDeleteButton"
          style={{ border: "none", color: "green", background: "tranparent" }}
          onClick={() => {
            this.handleProductModule(e);
          }}
        >
          <FaList />
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (e) => (
        <>
          <Delete id={e} deleteItem={() => this.delete(e)} />
          <Link to={`/sales-and-billing/order/update/${e}`}>
            <Edit />
          </Link>
        </>
      ),
      fixed: "right",
    },
  ];

  productColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (e) => e || "-",
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (e) => e || "-",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (e) => e || "-",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
  ];

  handleCancelProductList = () => {
    this.setState({ formOpenProductList: false });
  };

  handleProductModule = (id) => {
    const order = this.state.data.find((order) => order.id === id); // Find the order by id

    this.setState({
      formOpenProductList: true,
      productData: order.orderItems,
    });
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Order</h2>
          <Link to="/sales-and-billing/order/new">
            <Button type="primary" icon={<UserAddOutlined />}>
              Add
            </Button>
          </Link>
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
            scroll={{ x: "max-content" }}
          />
        </ConfigProvider>
        <Modal
          title="Order"
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
          width={750}
        >
          <Form
            ref={this.formRef}
            name="form_item_path"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={["customer", "name"]}
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter the name!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={["customer", "phoneNumber"]}
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number!",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number!",
                    },
                  ]}
                >
                  <Input type="tel" placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name={["customer", "email"]} label="Email">
                  <Input type="email" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={"totalAmount"}
                  label="Total Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the total amount!",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Total Amount" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={"advanceAmount"}
                  label="Advance Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the total advance!",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Advance Amount" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={"balanceAmount"}
                  label="Balance Amount"
                  rules={[
                    { required: true, message: "Please enter the balance!" },
                  ]}
                >
                  <Input type="Number" placeholder="Balance Amount" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select the status!" },
                  ]}
                  // initialValue={"Ordered"}
                >
                  <Select
                    options={[
                      {
                        value: "ORDERED",
                        label: "Ordered",
                      },
                      {
                        value: "PENDING",
                        label: "Pending",
                      },
                      {
                        value: "CANCELED",
                        label: "Canceled",
                      },
                      {
                        value: " DELIVERED",
                        label: "Delivered",
                      },
                    ]}
                    placeholder="Status"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="expectedDeliveryDate"
                  label="Expected Delivery"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the delivery date!",
                    },
                  ]}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name={["customer", "address"]}
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the address",
                    },
                  ]}
                >
                  <TextArea placeholder="Address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List name="orderItems" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
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
                          bordered
                          dataSource={fields}
                          pagination={false}
                          rowKey={(field) => field.key}
                          columns={[
                            {
                              title: "Product Name",
                              dataIndex: "productName",
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
                                    style={{
                                      border: "none",
                                      boxShadow: "none",
                                    }}
                                    placeholder="Product Name"
                                  />
                                </Form.Item>
                              ),
                            },
                            {
                              title: "Brand",
                              dataIndex: "brand",
                              render: (_, field) => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, "brand"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Enter Brand",
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
                              render: (_, field) => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, "variant"]}
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
                              title: "Quantity",
                              dataIndex: "quantity",
                              render: (_, field) => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, "quantity"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Enter Quantity",
                                    },
                                  ]}
                                  style={{ margin: 0 }}
                                >
                                  <Input
                                    placeholder="Quantity"
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
                              title: "Price",
                              dataIndex: "price",
                              render: (_, field) => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, "price"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Enter Price",
                                    },
                                  ]}
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
                      </ConfigProvider>
                      <br />
                      <Flex justify="space-between">
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            Add
                          </Button>
                        </Form.Item>
                      </Flex>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          title={"Order Items"}
          open={this.state.formOpenProductList}
          onCancel={this.handleCancelProductList}
          footer={false}
          width={800}
        >
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#7CB9E8",
                },
              },
            }}
          >
            <Table
              columns={this.productColumns}
              dataSource={this.state.productData}
              scroll={{
                x: "max-content",
              }}
            />
          </ConfigProvider>
        </Modal>
      </Spin>
    );
  }
}

export default Order;
