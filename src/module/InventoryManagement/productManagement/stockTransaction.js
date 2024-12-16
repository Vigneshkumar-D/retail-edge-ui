import TableParentPage from "../../../component/tableParentPage";
import {
  AutoComplete,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";
import StockTransactionService from "../../../service/customizeServices/InventoryManagement/product_management/stockTransactionService";
import { UserAddOutlined } from "@ant-design/icons";
import ProductService from "../../../service/customizeServices/InventoryManagement/product_management/productService";
import { DateTimeFormat } from "../../../service/defaultServices/formates";
import View from "../../../component/viewButton";

class StockTransaction extends TableParentPage {
  service = new StockTransactionService();
  productService = new ProductService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
      productList: [],
    };
  }
  columns = [
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      render: (e) => e?.productName || "-",
      fixed: "left",
    },
    {
      title: "variant",
      dataIndex: "product",
      key: "product",
      render: (e) => e?.variant || "-",
    },
    {
      title: "imei Number",
      dataIndex: "product",
      key: "product",
      render: (e) => e?.imeiNumber || "-",
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      key: "type",
      render: (e) => e || "-",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (e) => e || "-",
    },
    {
      title: "From / To",
      dataIndex: "fromOrTo",
      key: "fromOrTo",
      render: (e) => e || "-",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
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
      fixed: "right",
    },
  ];
  componentDidMount() {
    super.componentDidMount();
    this.setState({ isLoading: true });
    this.productService
      .getAll()
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Stock Transaction</h2>
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
          title="Stock Transaction"
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
                  name={["product", "id"]}
                  label="Product"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the product name",
                    },
                  ]}
                >
                  <Select
                    options={this.state.productList?.map((d) => {
                      return { label: d.productName, value: d.id };
                    })}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: "Please enter the type" }]}
                >
                  <Select
                    options={[
                      {
                        value: "TRANSFER",
                        label: "TRANSFER",
                      },
                      {
                        value: "RECEIVED",
                        label: "RECEIVED",
                      },
                    ]}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[
                    { required: true, message: "Please enter the quantity" },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="fromOrTo"
                  label="From / To"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the transfer person",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="transactionDate"
                  label="Transaction Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the transaction date",
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD hh-mm a"
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

export default StockTransaction;
