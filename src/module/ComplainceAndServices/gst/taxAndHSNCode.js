import TableParentPage from "../../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  message,
  Table,
} from "antd";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";
import TaxAndHSNCodeService from "../../../service/customizeServices/ComplainceAndServices/GST/hsnCodeAndTaxSlabService";
import { SyncOutlined, UserAddOutlined } from "@ant-design/icons";
import CategoryService from "../../../service/customizeServices/InventoryManagement/product_management/categoryService";
import View from "../../../component/viewButton";

class TaxAndHSNCode extends TableParentPage {
  service = new TaxAndHSNCodeService();
  categoryService = new CategoryService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,
      categoryList: [],

      // specific datas
    };
  }
  columns = [
    {
      title: "HSN Code",
      dataIndex: "code",
      key: "code",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (e) => e || "-",
    },
    {
      title: "Region",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => e?.region || "-",
    },
    {
      title: "Category",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => e?.category?.category || "-",
    },
    {
      title: "SGST",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => `${e?.sgst}%`,
    },
    {
      title: "CGST",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => `${e?.cgst}%`,
    },
    {
      title: "IGST",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => `${e?.igst}%`,
    },
    {
      title: "Service Type",
      dataIndex: "taxSlab",
      key: "taxSlab",
      render: (e) => e?.serviceType || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
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
    this.categoryService
      .getAll()
      .then((res) =>
        this.setState({
          categoryList: res.data?.data.map((e) => ({
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
    // this.setState((prev) => ({ ...prev, selectedCategory: v }));
    const data = this.state?.categoryList?.find((e) => e.value === v);
    this.formRef.current.setFieldsValue({
      taxSlab: { category: { id: data.value, category: data.label } },
    });
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Tax and HSN Code</h2>
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
          title="Tax and HSN Code"
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
                  name="code"
                  label="HSN Code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the code",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="description"
                  label="Description"
                  className="form-input-tag-bottom-space"
                  rules={[
                    { required: true, message: "Please enter the description" },
                  ]}
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "region"]}
                  label="Region"
                  className="form-input-tag-bottom-space"
                  rules={[
                    { required: true, message: "Please enter the model" },
                  ]}
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "category", "id"]}
                  label="Category"
                  className="form-input-tag-bottom-space"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the low stock threshold",
                    },
                  ]}
                >
                  <Select
                    className="input-tag-style"
                    onChange={this.onChangeing}
                    options={this.state.categoryList}
                    disabled={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {/* hide perpose */}
              <Form.Item
                name={["taxSlab", "category", "category"]}
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please enter the low stock threshold",
                  },
                ]}
                hidden
              >
                <Input readOnly={this.state.mode === "view"} />
              </Form.Item>
              {/* hide perpose */}
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "sgst"]}
                  label="SGST"
                  className="form-input-tag-bottom-space"
                  rules={[
                    { required: true, message: "Please enter the stock level" },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "cgst"]}
                  label="CGST"
                  className="form-input-tag-bottom-space"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the actual price",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "igst"]}
                  label="IGST"
                  className="form-input-tag-bottom-space"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the selling price",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["taxSlab", "serviceType"]}
                  label="Service Type"
                  className="form-input-tag-bottom-space"
                  rules={[
                    { required: true, message: "Please enter the tax rate" },
                  ]}
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
                  <Button
                    icon={
                      <Spin
                        spinning={this.state.isLoading}
                        indicator={<SyncOutlined spin />}
                        style={{ color: "white" }}
                      />
                    }
                    type="primary"
                    htmlType="submit"
                  >
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

export default TaxAndHSNCode;
