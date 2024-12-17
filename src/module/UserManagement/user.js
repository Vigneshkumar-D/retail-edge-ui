import TableParentPage from "../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import UserService from "../../service/customizeServices/UserManagements/userService";
import { DateTimeFormat } from "../../service/defaultServices/formates";
import { UserAddOutlined } from "@ant-design/icons";
import RoleService from "../../service/customizeServices/UserManagements/roleService";
import View from "../../component/viewButton";

class User extends TableParentPage {
  service = new UserService();
  roleService = new RoleService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,
      // costom data
      roleList: [],
    };
  }
  columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (e) => e || "-",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (e) => e || "-",
    },
    {
      title: "Role",
      dataIndex: ["role", "roleName"],
      key: "role",
      render: (roleName) => roleName || "-",
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (e) => (e ? "Active" : "Inactive"),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
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
  componentDidMount() {
    super.componentDidMount();
    this.roleService
      .getAll()
      .then((res) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            roleList: res.data.data.map((e) => {
              return { value: e.id, label: e.roleName };
            }),
          };
        });
      })
      .catch((err) => {
        message.error(err);
      });
  }
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>User</h2>
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
          title="User"
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            // ref={this.form} // Attach form reference
            ref={this.formRef}
            name="form_item_path"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the username}`,
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the email}`,
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="mobileNumber"
                  label="Mobile Number"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the username}`,
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["role","id"]}
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: `Please select the role}`,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Role"
                    options={this.state.roleList}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {this.state.mode === "add" && (
                <Col xs={24} sm={12}>
                  <Form.Item name="password" label="Password">
                    <Input.Password
                      type="Password"
                      readOnly={this.state.mode === "view"}
                    />
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} sm={12}>
                <Form.Item
                  name="active"
                  label="Active"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the active}`,
                    },
                  ]}
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

export default User;
