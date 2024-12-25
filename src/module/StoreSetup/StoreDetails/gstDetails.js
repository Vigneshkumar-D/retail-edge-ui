import { Button, Card, Flex, Form, Input, message, Spin } from "antd";
import StoreConfigurationParent from "./storeConfigurationParent";
import GstService from "../../../service/customizeServices/StoreManagement/StoreDetails/gestService";
import { SyncOutlined } from "@ant-design/icons";

class GstDetails extends StoreConfigurationParent {
  service = new GstService();
  constructor() {
    super();
    this.state = {
      ...this.state,
    };
    this.save = this.save.bind(this); // Bind the save method
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        if (res.data.data.length > 0) {
          this.setState({ id: res.data.data[0].id });
          if (this.formRef.current) {
            this.formRef.current.setFieldsValue(res.data.data[0]);
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

  save = (data) => {
    const requestBody = {};
    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().includes("image") && Array.isArray(data[key])) {
        const file = data[key][0]?.originFileObj;
        if (file) {
          requestBody[key] = file.name;
        }
      } else {
        requestBody[key] = data[key];
      }
    });

    // Indicate loading state
    this.setState({ isLoading: true });

    if (!this.state.id) {
      // Send normal data as JSON for creating a new entry
      this.service
        .create(requestBody) // Ensure the service method accepts normal JSON data
        .then((res) => {
          this.setState({ id: res.data.data.id });
          message.success("Created successfully");
          this.setState({ readOnly: true });
          this.formRef.current.setFieldsValue(res.data); // Update form values with server response
        })
        .catch((err) => {
          message.error(err.response.data.message || "Failed to create entry");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.service
        .updateItem(this.state.id, requestBody) // Ensure the service method accepts normal JSON data
        .then((res) => {
          message.success("Updated successfully");
          this.setState({ id: res.data.data.id });
          this.formRef.current.setFieldsValue(res.data); // Update form values with server response
          this.setState({ readOnly: true });
        })
        .catch((err) => {
          message.error(err.response.data.message || "Failed to update entry");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Card
          footer={false}
          style={{ marginTop: "10px" }}
          title={
            <Flex justify="space-between">
              <h3>GST Details</h3>
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
              label="GST Number (GSTIN)"
              name="gstin"
              rules={[{ required: true, message: "Enter GST Number!" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Legal Name"
              name="legalName"
              rules={[
                {
                  required: true,
                  message: "Enter Legal Name of the Business",
                },
              ]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Trade Name"
              name="tradeName"
              rules={[{ required: true, message: "Enter Trade Name" }]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Type of Registration"
              name="typeOfRegistration"
              rules={[
                { required: true, message: "Enter Type of Registration" },
              ]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[
                { required: true, message: "Enter State and Jurisdiction" },
              ]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>
            <Form.Item
              label="Jurisdiction"
              name="jurisdiction"
              rules={[
                { required: true, message: "Enter State and Jurisdiction" },
              ]}
            >
              <Input disabled={this.state.readOnly} />
            </Form.Item>

            <Flex justify="end">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.readOnly}
                  icon={
                    <Spin
                      spinning={this.state.isLoading}
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
      </Spin>
    );
  }
}

export default GstDetails;
