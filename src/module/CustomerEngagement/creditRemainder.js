import TableParentPage from "../../component/tableParentPage";
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
  Radio,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import { UserAddOutlined } from "@ant-design/icons";
import CreditReminderService from "../../service/customizeServices/CustomerEngagement/creditreminderService";
import CustomerService from "../../service/customizeServices/CustomerEngagement/customer";
import TextArea from "antd/es/input/TextArea";
import { DateFormat } from "../../service/defaultServices/formates";
import View from "../../component/viewButton";

class CreditRemainder extends TableParentPage {
  service = new CreditReminderService();
  customerService = new CustomerService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
      customerList: [],
    };
  }
  columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (e) => `${e?.name}` || "-",
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "customer",
      key: "customer",
      render: (e) => `${e?.phoneNumber}` || "-",
      fixed: "left",
    },
    {
      title: "Credit Amount",
      dataIndex: "totalCreditAmount",
      key: "totalCreditAmount",

      render: (e) => (e === null ? "-" : `₹${e.toLocaleString()}`),
    },
    {
      title: "Last Payment",
      dataIndex: "lastPayment",
      key: "lastPayment",
      render: (e) => (e === null ? "-" : `₹${e}`),
    },
    {
      title: "Balance",
      dataIndex: "remainingBalance",
      key: "remainingBalance",
      render: (e) => (e === null ? "-" : `₹${e}`),
    },
    {
      title: "Last Paid On",
      dataIndex: "lastPaymentDate",
      key: "lastPaymentDate",
      render: (e) => {
        return DateFormat(e) || "-";
      },
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (e) => DateFormat(e) || "-",
    },
    {
      title: "Notified",
      dataIndex: "reminderSent",
      key: "reminderSent",
      render: (e) => (e ? "Yes" : "No"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Credit Type",
      dataIndex: "creditType",
      key: "creditType",
      render: (e) => e?.map((f) => <li>{f},</li>),
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
    this.customerService
      .getAll()
      .then((res) => {
        this.setState((prevState) => {
          return { ...prevState, customerList: res.data.data };
        });
      })
      .catch((err) => {
        message.error(err.response.data?.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Credit Reminder</h2>
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
          title="Credit Reminder"
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
                  name={["customer", "phoneNumber"]}
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the name",
                    },
                  ]}
                >
                  <AutoComplete
                    options={this.state.customerList?.map((cat) => ({
                      value: cat.phoneNumber,
                      label: cat.phoneNumber,
                    }))}
                    placeholder="Select a phone number"
                    onSelect={(value) => {
                      const selectedCustomer = this.state.customerList.find(
                        (d) => d.phoneNumber === value
                      );
                      if (selectedCustomer) {
                        this.formRef.current.setFieldsValue({
                          customer: selectedCustomer,
                        });
                      }
                    }}
                    filterOption={(inputValue, option) =>
                      option?.label
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["customer", "id"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the name",
                    },
                  ]}
                >
                  <Select
                    open={false}
                    options={this.state.customerList?.map((e) => {
                      return {
                        value: e?.id,
                        label: e?.name,
                      };
                    })}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="totalCreditAmount"
                  label="Total Credit"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the total credit amount",
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              {this.state.mode === "add" || (
                <>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="remainingBalance"
                      label="Balance"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the balance",
                        },
                      ]}
                    >
                      <Input
                        type="Number"
                        readOnly={this.state.mode === "view"}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastPayment"
                      label="Last Payment"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the last payment",
                        },
                      ]}
                    >
                      <Input
                        type="Number"
                        readOnly={this.state.mode === "view"}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastPaymentDate"
                      label="Last Paid On"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the last payment date",
                        },
                      ]}
                    >
                      <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: "100%" }}
                        readOnly={this.state.mode === "view"}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
              <Col xs={24} sm={12}>
                <Form.Item
                  name="dueDate"
                  label="Due Date"
                  rules={[
                    { required: true, message: "Please enter the due date" },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="creditType"
                  label="Credit Type"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the credit type",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    readOnly={this.state.mode === "view"}
                    options={[
                      {
                        value: "MOBILE",
                        label: "MOBILE",
                      },
                      {
                        value: "ACCESSORIES",
                        label: "ACCESSORIES",
                      },
                      {
                        value: "RECHARGE",
                        label: "RECHARGE",
                      },
                      {
                        value: "SERVICE",
                        label: "SERVICE",
                      },
                      {
                        value: "OTHER",
                        label: "OTHER",
                      },
                      {
                        value: "EMI",
                        label: "EMI",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the description",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Description"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="reminderSent"
                  label="Reminder Sent"
                  rules={[{ required: true, message: "Please check the box" }]}
                >
                  <Radio.Group readOnly={this.state.mode === "view"}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
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

export default CreditRemainder;
