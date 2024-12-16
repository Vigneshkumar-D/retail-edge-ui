import TableParentPage from "../../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
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
import ProductService from "../../../service/customizeServices/InventoryManagement/product_management/productService";
import CategoryService from "../../../service/customizeServices/InventoryManagement/product_management/categoryService";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import Category from "./category";

class Product extends TableParentPage {
  service = new ProductService();
  categoryService = new CategoryService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
      categoryList: [],
      selectedCategory: null,
      categoryFormOpen: false,
    };
  }
  columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (e) => e || "-",
      fixed: "left",
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   render: (e) => e || "-",
    //   fixed: "left",
    // },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (e) => e || "-",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (e) => e?.category || "-",
    },
    {
      title: "Stock Level",
      dataIndex: "stockLevel",
      key: "stockLevel",
      render: (e) => e || "-",
    },
    {
      title: "Low Stock",
      dataIndex: "lowStockThreshold",
      key: "lowStockThreshold",
      render: (e) => e || "-",
    },
    {
      title: "Actual Price",
      dataIndex: "actualPrice",
      key: "actualPrice",
      render: (e) => `₹${e}` || "-",
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      render: (e) => `₹${e}` || "-",
    },
    {
      title: "Barcode/IMEI",
      key: "barcode_imei",
      render: (text, record) => {
        const displayValue = record.barcode || record.imeiNumber || "-";
        return <span>{displayValue}</span>;
      },
      align: "center",
    },
    {
      title: "Barcode Image",
      dataIndex: "barcodeImage",
      key: "barcodeImage",

      render: (e) => {
        if (!e) return "-";
        const imageUrl = `data:image/png;base64,${e}`;
        return (
          <img
            src={imageUrl}
            alt="Barcode"
            style={{ width: "100px", height: "auto" }}
          />
        );
      },
      align: "center",
      // fixed:"right"
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
          </>
        );
      },
      fixed: "right",
    },
  ];
  componentDidMount() {
    super.componentDidMount();
    this.setState({ isLoading: true });
    this.categoryService
      .getAll()
      .then((res) =>
        this.setState({
          categoryList: res.data.map((e) => ({
            value: e.id,
            label: e.category,
          })),
        })
      )
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  onChangeing = (v) => {
    this.setState((prev) => ({ ...prev, selectedCategory: v }));
  };
  categoryHandleCancel = () => {
    this.setState({ isLoading: true });
    this.setState({ categoryFormOpen: false, isLoading: false });
    this.componentDidMount();
  };
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Product</h2>
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
          title="Product"
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
                  name="productName"
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the product name",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[
                    { required: true, message: "Please enter the brand" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="model"
                  label="Model"
                  rules={[
                    { required: true, message: "Please enter the model" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="variant"
                  label="Variant"
                  rules={[
                    { required: true, message: "Please enter the variant" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="stockLevel"
                  label="Stock Level"
                  rules={[
                    { required: true, message: "Please enter the stock level" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input type="number" className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="actualPrice"
                  label="Actual Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the actual price",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input type="number" className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="sellingPrice"
                  label="Selling Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the selling price",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input type="number" className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lowStockThreshold"
                  label="Low Stock Threshold"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the low stock threshold",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input type="number" className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["category", "id"]}
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the low stock threshold",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    optionFilterProp="label"
                    value={this.state.selectedIndustries}
                    onChange={this.onChangeing}
                    options={this.state.categoryList}
                    className="input-tag-style"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "5px 0px 0px" }} />
                        <Button
                          icon={<EditOutlined />}
                          type="primary"
                          block
                          onClick={() => {
                            this.setState({ categoryFormOpen: true });
                          }}
                          // disabled={this.state.isFeatureDisabled}
                        >
                          Edit category
                        </Button>
                      </>
                    )}
                  />
                </Form.Item>
              </Col>
              {(this.state.categoryList
                ?.find((e) => e.value == this.state.selectedCategory)
                ?.label.toLocaleLowerCase()
                .includes("phone") ||
                this.state.categoryList
                  ?.find((e) => e.value === this.state.selectedCategory)
                  ?.label.toLocaleLowerCase()
                  .includes("mobile")) && (
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="imeiNumber"
                    label="IMEI Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the IMEI number",
                      },
                    ]}
                  >
                    <Input type="Number" />
                  </Form.Item>
                </Col>
              )}

              <Flex justify="end" style={{ width: "100%" }}>
                <Button type="primary" htmlType="submit">
                  {this.state.mode == "add" ? "Add" : "Update"}
                </Button>
              </Flex>
            </Row>
          </Form>
        </Modal>
        <Drawer
          title="Category"
          open={this.state.categoryFormOpen}
          onClose={this.categoryHandleCancel}
          footer={false}
        >
          <Category />
        </Drawer>
      </Spin>
    );
  }
}

export default Product;
