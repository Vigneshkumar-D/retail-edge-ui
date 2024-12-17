import { Button, Card, Flex, Form, Input, message, Spin, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import StoreConfigurationParent from "./storeConfigurationParent";
import StoreService from "../../../service/customizeServices/StoreManagement/StoreDetails/storeService";

class Store extends StoreConfigurationParent {
  service = new StoreService();
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
          style={{ minHeight: "578px" }}
          title={
            <Flex justify="space-between">
              <h3>Store Details</h3>
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
            onFinish={(data) => this.save(data)} // Arrow function to preserve context
          >
            <Form.Item
              label="Store Name"
              name="storeName"
              rules={[{ required: true, message: "Enter Store Name!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Enter Store Address" }]}
            >
              <TextArea
                rows={3}
                placeholder="Enter your Address"
                disabled={this.state.readOnly}
              />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Enter state!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Pincode"
              name="pinCode"
              rules={[{ required: true, message: "Enter pincode!" }]}
            >
              <Input type="Number" disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Primary Phone"
              name="primaryPhone"
              rules={[{ required: true, message: "Enter Primary Phone" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Secondary Phone"
              name="secondaryPhone"
              rules={[{ required: true, message: "Enter Secondary Phone" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Store Logo Image"
              name="storeLogoImage"
              rules={[{ required: true, message: "Enter Upload UPI QR Code!" }]}
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

export default Store;
