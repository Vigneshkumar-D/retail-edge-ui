import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Modal,
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
      ...this.state,
      fileList: [], // Store Logo file list
      upiQRCodeFileList: [], // UPI QR Code file list
      previewVisible: false,
      previewImage: "",
    };

    this.save = this.save.bind(this); // Bind the save method
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        // if (res.data.data.length > 0) {
        //   const storeData = res.data.data[0];

        //   // Process storeLogoImage for Upload component
        //   const fileList =
        //     storeData.upiQRCodeImage &&
        //     typeof storeData.upiQRCodeImage === "string"
        //       ? [
        //           {
        //             uid: "-1",
        //             name: "store-logo.jpg",
        //             status: "done",
        //             url: storeData.storeLogoImage, // Assuming this is the image URL
        //           },
        //         ]
        //       : [];

        //   // Set processed form data
        //   const processedFormData = {
        //     ...storeData,
        //     upiQRCodeImage: fileList, // Use the formatted file list
        //   };

        //   this.setState({ id: storeData.id });
        //   if (this.formRef.current) {
        //     this.formRef.current.setFieldsValue(processedFormData);
        //   }
        // }
        if (res.data.data.length > 0) {
          const storeData = res.data.data[0];

          const upiQRCodeFileList =
            storeData.upiQRCodeImage &&
            typeof storeData.upiQRCodeImage === "string"
              ? [
                  {
                    uid: "-1",
                    name: "upi-qr-code.jpg",
                    status: "done",
                    url: storeData.upiQRCodeImage,
                  },
                ]
              : [];

          this.setState({
            id: storeData.id,
            upiQRCodeFileList,
          });

          if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
              ...storeData,
              upiQRCodeImage: upiQRCodeFileList,
            });
          }
        }
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Failed to fetch data");
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
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

              {/* <Form.Item
                label="UPI QR Code Image"
                name="upiQRCodeImage"
                rules={[
                  { required: true, message: "Enter Upload UPI QR Code!" },
                ]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList || []}
              >
                <Upload
                  listType="picture-card"
                  disabled={this.state.readOnly}
                  accept="image/*"
                  onChange={this.handleFileChange}
                  onPreview={this.handlePreview}
                  fileList={this.state.fileList} // Explicitly control the file list
                  maxCount={1} // Prevent more than one file
                >
                  {this.state.fileList?.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item> */}

              <Form.Item
                label="UPI QR Code Image"
                name="upiQRCodeImage"
                rules={[
                  { required: true, message: "Please upload the UPI QR Code!" },
                ]}
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList || []}
              >
                <Upload
                  listType="picture-card"
                  disabled={this.state.readOnly}
                  accept="image/*"
                  onChange={(info) =>
                    this.setState({ upiQRCodeFileList: info.fileList })
                  }
                  onPreview={(file) => {
                    this.setState({
                      previewImage: file.url || file.preview,
                      previewVisible: true,
                    });
                  }}
                  fileList={this.state.upiQRCodeFileList} // Bind specific state
                  maxCount={1}
                >
                  {this.state.upiQRCodeFileList.length >= 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
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
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="Preview"
            style={{ width: "100%" }}
            // src={this.state.previewImage}
            src={`data:image/png;base64,${this.state?.previewImage}`}
          />
        </Modal>
      </Spin>
    );
  }
}

export default Account;
