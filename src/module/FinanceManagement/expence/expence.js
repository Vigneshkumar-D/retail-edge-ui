import TableParentPage from "../../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
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
import { EditOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { DateTimeFormat } from "../../../service/defaultServices/formates";
import View from "../../../component/viewButton";
import ExpenseCategoryService from "../../../service/customizeServices/FinanceManagement/expenseCategory";
import ExpenseService from "../../../service/customizeServices/FinanceManagement/expense";
import TextArea from "antd/es/input/TextArea";
import ExpenseCategory from "./expenceCategory";
import UserService from "../../../service/customizeServices/UserManagements/userService";

class Expence extends TableParentPage {
  service = new ExpenseService();
  expenseCategoryService = new ExpenseCategoryService();
  userService = new UserService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
      categoryFormOpen: false,
      salesManList: [],
    };
  }
  columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (e) => e.username || "-",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (e) => e.category,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (e) => `₹${e}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      // width: "150px",
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
    this.expenseCategoryService
      .getAll()
      .then((res) =>
        this.setState({
          categoryList: res.data.data.map((e) => ({
            value: e.id,
            label: e.category,
          })),
        })
      )
      .catch((err) => {
        message.error(err.response.data?.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    this.userService
      .getAll()
      .then((res1) => {
        this.setState({ salesManList: res1.data.data, mode: "add" });
      })
      .catch((err) => message.error(err.response.data.message))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  categoryHandleCancel = () => {
    this.setState({ isLoading: true });
    this.setState({ categoryFormOpen: false, isLoading: false });
    this.componentDidMount();
  };
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Expence</h2>
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
                  name={["category", "id"]}
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the category",
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
                    disabled={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["user", "id"]}
                  label="Spend By"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Spending person",
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
                    disabled={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    { required: true, message: "Please enter the amount" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="paymentMethod"
                  label="Payment Method"
                  rules={[
                    { required: true, message: "Please enter payment method" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="description"
                  label="Description"
                  // rules={[
                  //   { required: true, message: "Please enter description" },
                  // ]}
                  className="form-input-tag-bottom-space"
                >
                  <TextArea
                     readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the date",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD hh-mm a"
                    style={{ width: "100%" }}
                    disabled={this.state.mode === "view"}
                    className="input-tag-style"
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
        <Drawer
          title="Category"
          open={this.state.categoryFormOpen}
          onClose={this.categoryHandleCancel}
          footer={false}
        >
          <ExpenseCategory />
        </Drawer>
      </Spin>
    );
  }
}

export default Expence;
