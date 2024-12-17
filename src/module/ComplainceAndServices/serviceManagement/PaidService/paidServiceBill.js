import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../../../service/customizeServices/UserManagements/userService";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import PaidServiceService from "../../../../service/customizeServices/ComplainceAndServices/ServiceManagement/paidServicesService";
import BillParentComponent from "../../../CommonComponents/billParentComponent";

class PaidServiceBillClass extends BillParentComponent {
  userService = new UserService();
  service = new PaidServiceService();
  updateUrl = "/complaince-and-services/service-management/paid-service"
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form
          layout="vertical"
          onFinish={this.save}
          initialValues={{
            paymentMethod: ["CASH"], // Default value for Checkbox.Group
            totalAmount: 0,
          }}
          onValuesChange={(changedValues, allValues) => {
            const profitMargin =
              (allValues.customerCost || 0) - (allValues.sparePartCost || 0);
            this.form.setFieldsValue({
              profitMargin,
            });
          }}
          ref={(formRef) => (this.form = formRef)}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} lg={16}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <Link to="/complaince-and-services/service-management/paid-service">
                  <Flex>
                    <ArrowLeftOutlined />

                    <h3 style={{ color: "blue", paddingLeft: "5px" }}>
                      Paid Service
                    </h3>
                  </Flex>
                </Link>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
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
                      name="serviceDate"
                      label="Service Date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the service date",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="advancePayment"
                      label="Advance Payment"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer cost",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input type="Number" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="imeiNumber"
                      label="IMEI Number"
                      className="form-input-tag-bottom-space"
                      rules={[
                        {
                          pattern: /^[0-9]{15}$/,
                          message: "Please enter a valid 15-digit IMEI number",
                        },
                      ]}
                    >
                      <Input className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["receivedBy", "id"]}
                      label="Received By"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the received person",
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
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="sparePartDescription"
                      label="Spare Part"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the spare part",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="sparePartCost"
                      label="Spare Part Cost"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the spare part cost",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input type="Number" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="customerCost"
                      label="Customer Cost"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer cost",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input type="Number" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="profitMargin"
                      label="Profit Margin"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the profit margin",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="Number"
                        className="input-tag-style"
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="complaintDescription"
                      label="Complaint Description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the description",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <TextArea
                        placeholder="Description"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <h3 style={{ color: "blue" }}>Customer Details</h3>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Row gutter={[5, 5]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "name"]}
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the name",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="Name" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "phoneNumber"]}
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the phoneNumber",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={["customer", "email"]}
                      label="Email"
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="email"
                        placeholder="Email"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "dateOfBirth"]}
                      label="Date of Birth"
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "gstin"]}
                      label="GSTIN"
                      className="form-input-tag-bottom-space"
                    >
                      <Input className="input-tag-style" placeholder="GSTIN" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={["customer", "address"]}
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the address",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        placeholder="Address"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "state"]}
                      label="State"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the  state",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="State" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "pinCode"]}
                      label="Pincode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the pincode",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="Number"
                        placeholder="Pincode"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Flex justify="end" style={{ width: "100%" }}>
                    <Button type="primary" htmlType="submit">
                      {this.state.mode === "add" ? "Submit" : "Update"}
                    </Button>
                  </Flex>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const PaidServiceBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <PaidServiceBillClass id={id} navigate={navigate} />;
};

export default PaidServiceBill;
