import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Spin,
} from "antd";
import EmailAndSmsConfigurationService from "../../service/customizeServices/UserManagements/emailAndSmsConfigurationService";
import { useState } from "react";
import { SyncOutlined } from "@ant-design/icons";

const EmailAndSmsConfiguration = () => {
  const service = new EmailAndSmsConfigurationService();
  const [state, setState] = useState({
    isLoading: false,
  });

  return (
    <Spin spinning={state.isLoading}>
      <Row gutter={[10, 10]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Flex justify="space-between">
                <h3>Mail Configuration</h3>
                <Button type="primary">Update</Button>
              </Flex>
            }
          >
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              labelAlign="left"
              colon={false}
              layout="horizontal"
            >
              <Form.Item
                label="SMTP Server"
                name="smtpServer"
                rules={[{ required: true, message: "Enter SMTP Server" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SMTP Port"
                name="smtpPort"
                rules={[{ required: true, message: "Enter SMTP Port" }]}
              >
                <Input type="Number" />
              </Form.Item>
              <Form.Item
                label="Account User"
                name="accountUser"
                rules={[{ required: true, message: "Enter Account User" }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Account Password"
                name="accountPassword"
                rules={[{ required: true, message: "Enter Account Password" }]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item label="Authentication" name="authentication">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Enable TLS" name="enableTls">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
                </Radio.Group>
              </Form.Item>
              <Flex justify="end">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Flex justify="space-between">
                <h3>SMS Configuration</h3>
                <Button
                  type="primary"
                  icon={
                    <Spin
                      spinning={state.isLoading}
                      indicator={<SyncOutlined spin />}
                      style={{ color: "white" }}
                    />
                  }
                >
                  Update
                </Button>
              </Flex>
            }
          >
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              labelAlign="left"
              colon={false}
              layout="horizontal"
            >
              <Form.Item
                label="Account SID"
                name="accountSid"
                rules={[{ required: true, message: "Enter Account SID" }]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                label="Auth ID"
                name="authId"
                rules={[{ required: true, message: "Enter Auth ID" }]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                label="Twilio Number"
                name="twilioNumber"
                rules={[{ required: true, message: "Enter Twilio Number" }]}
              >
                <Input type="Number" />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
                </Radio.Group>
              </Form.Item>
              <Flex justify="end">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={
                      <Spin
                        spinning={state.isLoading}
                        indicator={<SyncOutlined spin />}
                        style={{ color: "white" }}
                      />
                    }
                  >
                    Save
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default EmailAndSmsConfiguration;
