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
  Spin,
  Table,
} from "antd";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";
import CategoryService from "../../../service/customizeServices/InventoryManagement/product_management/categoryService";
import { UserAddOutlined } from "@ant-design/icons";
import View from "../../../component/viewButton";

class Category extends TableParentPage {
  service = new CategoryService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,
    };
  }
  columns = [
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
      render: (e) => e || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "150px",
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
          <h2>Category</h2>
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
          title="Basic Modal"
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
              <Col span={24}>
                <Form.Item
                  name="category"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the category",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
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

export default Category;
