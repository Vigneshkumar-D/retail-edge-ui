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
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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
      isLoading: false, // Track loading state
      readOnly: true, // For toggling form read-only mode
    };

    this.save = this.save.bind(this); // Bind the save method
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
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

  handleFileChange = ({ fileList }) => {
    this.setState({ upiQRCodeFileList: fileList });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

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
                {this.state.readOnly ? "Update" : "Cancel"}
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
                  { required: true, message: "Please upload the UPI QR Code!" },
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
                  fileList={this.state.upiQRCodeFileList}
                  maxCount={1} // Restrict to one file
                  itemRender={(originNode, file, fileList, actions) => (
                    <div
                      style={{
                        textAlign: "center",
                        position: "relative",
                      }}
                      className="upload-preview-container"
                    >
                      {/* Display the uploaded image */}
                      <img
                        src={
                          file.url
                            ? `data:image/png;base64,${file.url}`
                            : file.thumbUrl
                        }
                        alt={file.name}
                        style={{
                          width: "102px",
                          height: "102px",
                          borderRadius: "8px",
                        }}
                      />

                      {/* Add a custom remove or preview button */}
                      <div className="action-buttons">
                        {!this.state.readOnly ? (
                          <Button
                            type="link"
                            style={{
                              color: "white",
                              position: "absolute",
                              top: "0px",
                              right: "0px",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              height: "102px",
                              width: "102px",
                            }}
                            onClick={() => actions.remove()}
                          >
                            <DeleteOutlined />
                          </Button>
                        ) : (
                          <Button
                            type="link"
                            style={{
                              color: "white",
                              position: "absolute",
                              top: "0px",
                              right: "0px",
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              height: "102px",
                              width: "102px",
                            }}
                            onClick={() => {
                              this.setState({
                                previewVisible: true,
                                previewImage: file.url,
                              });
                            }}
                          >
                            <EyeOutlined />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
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
            src={`data:image/png;base64,${this.state?.previewImage}`}
          />
        </Modal>
      </Spin>
    );
  }
}

export default Account;
