import TableParentPage from "../../../component/tableParentPage";
import {
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
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";
import SupplierService from "../../../service/customizeServices/SupplierService/supplierService";
import { DateTimeFormat } from "../../../service/defaultServices/formates";
import { UserAddOutlined } from "@ant-design/icons";
import PaymentService from "../../../service/customizeServices/SupplierService/payment";
import View from "../../../component/viewButton";

class Payment extends TableParentPage {
  service = new PaymentService();
  supplierService = new SupplierService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      supplierData: [],
      formOpen: false,
      mode: null,
      id: null,
    };
  }

  columns = [
    {
      title: "Supplier Name", // Adding the Supplier Name column
      dataIndex: ["supplier", "supplierName"], // Nested access
      key: "supplierName",
      fixed: "left",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod", // Accessing nested property
      key: "paymentMethod",
      render: (e) => e || "-",
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus", // Accessing nested property
      key: "paymentStatus",
      render: (e) => {
        if (e == "Completed") {
          return (
            (
              <Tag icon={<CheckCircleOutlined />} color="success">
                {e}
              </Tag>
            ) || "-"
          );
        } else if (e == "Pending") {
          return (
            (
              <Tag icon={<SyncOutlined spin />} color="processing">
                {e}
              </Tag>
            ) || "-"
          );
        } else {
          return (
            (
              <Tag icon={<CloseCircleOutlined />} color="error">
                {e}
              </Tag>
            ) || "-"
          );
        }
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
      render: (e) => e || "-",
    },
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      key: "amount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Date",
      dataIndex: "paymentDate",
      key: "date",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (e) => e || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (e) => {
        return (
          <>
            <Edit
              onClickFn={() => {
                this.editForm(e);
              }}
            />
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <View onClickFn={() => this.viewForm(e)} />
          </>
        );
      },
      fixed: "right",
    },
  ];

  componentDidMount() {
    super.componentDidMount();
    this.supplierService
      .getAll()
      .then((res) => {
        const filteredSupplierData = res.data.data.map((supplier) => ({
          value: supplier.id,
          label: supplier.supplierName,
        }));
        this.setState({ supplierData: filteredSupplierData });
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
          <h2>Payment Details</h2>
          <div>
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                this.setState({ formOpen: true, mode: "add" });
              }}
              icon={<UserAddOutlined />}
            >
              Add
            </Button>
          </div>
        </Flex>
        <br />

        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#bdbdd7",
                //  borderColor:"#5aa3e4"
              },
            },
          }}
        >
          <Table
            dataSource={this.state.data}
            columns={this.columns}
            pagination={{ pageSize: 10 }}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>
        <Modal
          title={this.state.mode == "add" ? "Add" : "Update"}
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
          width={500}
        >
          <Form
            ref={this.formRef}
            name="payment_form"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["supplier", "id"]}
                  label="Supplier Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the supplier name",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    showSearch
                    placeholder="Select a Supplier"
                    options={this.state.supplierData}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    disabled={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="paymentMethod"
                  label="Payment Method"
                  rules={[
                    {
                      required: true,
                      message: "Please select a payment method",
                    },
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
                  name="paymentAmount"
                  label="Payment Amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the payment amount",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="transactionNumber"
                  label="Transaction Id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Transaction Id",
                    },
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
                  name="paymentStatus"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select a status" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    showSearch
                    placeholder="Select a status"
                    options={[
                      {
                        value: "Completed",
                        label: "Completed",
                      },
                      {
                        value: "Pending",
                        label: "Pending",
                      },
                    ]}
                    disabled={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="paymentDate"
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
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD hh-mm a"
                    disabled={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="remarks"
                  label="Remarks"
                  className="form-input-tag-bottom-space"
                >
                  <Input.TextArea
                    rows={2}
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <Spin
                        spinning={this.state.isLoading}
                        indicator={<SyncOutlined spin />}
                        style={{ color: "white" }}
                      />
                    }
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

export default Payment;
