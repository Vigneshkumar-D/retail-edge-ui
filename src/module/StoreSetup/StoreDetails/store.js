import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import StoreConfigurationParent from "./storeConfigurationParent";
import StoreService from "../../../service/customizeServices/StoreManagement/StoreDetails/storeService";

class Store extends StoreConfigurationParent {
  service = new StoreService();

  constructor() {
    super();
    this.state = {
      ...this.state,
      fileList: [], // Store Logo file list for Upload component
      previewVisible: false, // Controls visibility of the image preview modal
      previewImage: "", // Stores the URL or base64 string for the preview image
      isLoading: false, // Spinner state
    };

    this.save = this.save.bind(this); // Bind save method
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        if (res.data.data.length > 0) {
          const storeData = res.data.data[0];

          // Process storeLogoImage for the Upload component
          const fileList =
            storeData.storeLogoImage &&
            typeof storeData.storeLogoImage === "string"
              ? [
                  {
                    uid: "-1",
                    name: "store-logo.jpg",
                    status: "done",
                    url: storeData.storeLogoImage, // Assuming this is the image URL
                  },
                ]
              : [];

          this.setState({ id: storeData.id, fileList });

          if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
              ...storeData,
              storeLogoImage: fileList, // Set the processed file list
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
    this.setState({ fileList });
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
              label="Store Name"
              name="storeName"
              rules={[{ required: true, message: "Enter Store Name!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Enter Store Address!" }]}
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
              <Input type="number" disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="Primary Phone"
              name="primaryPhone"
              rules={[{ required: true, message: "Enter Primary Phone!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="Secondary Phone"
              name="secondaryPhone"
              rules={[{ required: true, message: "Enter Secondary Phone!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Form.Item
              label="Store Logo Image"
              name="storeLogoImage"
              rules={[
                { required: true, message: "Please upload the store logo!" },
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
                fileList={this.state.fileList}
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
                {this.state.fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
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

export default Store;
