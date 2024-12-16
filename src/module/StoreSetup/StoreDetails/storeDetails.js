import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Upload,

} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "../storeDetails.css"

class StoreDetails extends Component {
  state = {
    isloading: false,
  };

  render() {
    return (
      <Spin spinning={this.state.isloading}>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col xs={24} lg={12} >
            <Card
              style={{minHeight:"578px",}}
              title={
                <Flex justify="space-between">
                  <h3>Store Details</h3>
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
                  label="Store Name"
                  name="storeName"
                  // className="custom-form"
                  rules={[{ required: true, message: "Enter Store Name!" }]}
                >
                  <Input />
                </Form.Item>
             
                <Form.Item
                  label="Address"
                  name="adddress"
                  rules={[{ required: true, message: "Enter Store Address" }]}
                >
                  <TextArea rows={3} placeholder="Enter your Address" />
                </Form.Item>
                <Form.Item
                  label="Primary Phone"
                  name="primaryPhone"
                  rules={[{ required: true, message: "Enter Primary Phone" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Secondary Phone"
                  name="secondaryPhone"
                  rules={[{ required: true, message: "Enter Secondary Phone" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Store Logo"
                  name="storeLogo"
                  rules={[{ required: true, message: "Upload Store Logo" }]}
                >
                   <Upload
                      
                      listType="picture-card"
                      style={{height:"2px"}}
                      // fileList={fileList}
                      // onChange={handleChange}
                      // beforeUpload={beforeUpload}
                      accept="image/*"
                    >
                      {/* {fileList.length < 5 && ( */}
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 2, }}>Upload</div>
                        </div>
                      {/* )} */}
                    </Upload>
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
                  <h3>Account Details</h3>
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
                  label="Bank Name"
                  name="bankName"
                  rules={[{ required: true, message: "Enter Bank Name!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Branch"
                  name="branch"
                  rules={[{ required: true, message: "Enter Branch!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Account Number"
                  name="accountNumber"
                  rules={[{ required: true, message: "Enter Account Number!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="UPI ID"
                  name="upiId"
                  rules={[{ required: true, message: "Enter UPI Id!" }]}
                >
                  <Input />
                </Form.Item>
                <Col gutter={[8, 8]}>
                  <Form.Item
                    label="IFSC Code"
                    name="ifscCode"
                    rules={[{ required: true, message: "Enter IFSC Code!" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="UPI QR Code"
                    name="upiQrCode"
                    rules={[
                      { required: true, message: "Enter Upload UPI QR Code!" },
                    ]}
                  >
                    <Upload
                      
                      listType="picture-card"
                      style={{height:"2px"}}
                      // fileList={fileList}
                      // onChange={handleChange}
                      // beforeUpload={beforeUpload}
                      accept="image/*"
                    >
                      {/* {fileList.length < 5 && ( */}
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 2, }}>Upload</div>
                        </div>
                      {/* )} */}
                    </Upload>
                  </Form.Item>
                </Col>
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
         
        </Row>
        <Row
          justify={"space-between"}
          gutter={[10, 10]}
         
        >
           <Col xs={24} lg={12}>
            <Card
              footer={false}
              style={{marginTop:"10px"}}
              title={
                <Flex justify="space-between">
                  <h3>GST Details</h3>
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
                  label="GST Number (GSTIN)"
                  name="gstNumber"
                  rules={[{ required: true, message: "Enter GST Number!" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Legal Name"
                  name="legalNameOfTheBusiness"
                  rules={[
                    {
                      required: true,
                      message: "Enter Legal Name of the Business",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Trade Name"
                  name="tradeName"
                  rules={[{ required: true, message: "Enter Trade Name" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Type of Registration"
                  name="typeOfRegistration"
                  rules={[
                    { required: true, message: "Enter Type of Registration" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="State and Jurisdiction"
                  name="stateAndJurisdiction"
                  rules={[
                    { required: true, message: "Enter State and Jurisdiction" },
                  ]}
                >
                  <Input />
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
        
        </Row>
      </Spin>
    );
  }
}

export default StoreDetails;
