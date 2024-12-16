import TableParentPage from "../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import RoleService from "../../service/customizeServices/UserManagements/roleService";
import { UserAddOutlined } from "@ant-design/icons";
import { DateTimeFormat } from "../../service/defaultServices/formates";
import View from "../../component/viewButton";

class Role extends TableParentPage {
  service = new RoleService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
    };
  }
  columns = [
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (e) => (e ? "Active" : "Inactive"),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
      render: (e) => DateTimeFormat(e) || "-",
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
      fixed: "right",
    },
  ];
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Role</h2>
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
          title="Role"
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
                  name="roleName"
                  label="Role Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Role Name",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="active"
                  label="active"
                  rules={[{ required: true, message: "Please select status" }]}
                >
                  <Radio.Group disabled={this.state.mode === "view"}>
                    <Radio value={true}>Active</Radio>
                    <Radio value={false}>Inactive</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
                  <Button type="primary" htmlType="submit">
                    {this.state.mode === "add" ? "Add" : "Update"}
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

export default Role;
