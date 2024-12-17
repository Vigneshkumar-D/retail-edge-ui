import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Spin,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StoreConfigurationParent from "./storeConfigurationParent";
import AccountService from "../../../service/customizeServices/StoreManagement/StoreDetails/accountService";

class Account extends StoreConfigurationParent {
  service = new AccountService();
  constructor() {
    super();
    this.state = {
      readOnly: true,
    };
    this.save = this.save.bind(this); // Bind the save method
  }

  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Card
          title={
            <Flex justify="space-between">
              <h3>Account Details</h3>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ readOnly: !this.state.readOnly });
                }}
              >
                {this.state.readOnly ? "Update" : "Cancle"}
              </Button>
            </Flex>
          }
        >
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            colon={false}
            layout="horizontal"
            ref={this.formRef}
            onFinish={(data) => this.save(data)}
          >
            <Form.Item
              label="Bank Name"
              name="bankName"
              rules={[{ required: true, message: "Enter Bank Name!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Branch"
              name="branch"
              rules={[{ required: true, message: "Enter Branch!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[{ required: true, message: "Enter Account Number!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="UPI ID"
              name="upiId"
              rules={[{ required: true, message: "Enter UPI Id!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Col gutter={[8, 8]}>
              <Form.Item
                label="IFSC Code"
                name="ifscCode"
                rules={[{ required: true, message: "Enter IFSC Code!" }]}
              >
                <Input disabled={this.state.readOnly} />
              </Form.Item>
              <Form.Item
                label="UPI QR Code Image"
                name="upiQRCodeImage"
                rules={[
                  { required: true, message: "Enter Upload UPI QR Code!" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  style={{ height: "2px" }}
                  disabled={this.state.readOnly}
                  accept="image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 2 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Flex justify="end">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.readOnly}
                >
                  Save
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      </Spin>
    );
  }
}

export default Account;
