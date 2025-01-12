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
  Table,
} from "antd";
import UserService from "../../../../service/customizeServices/UserManagements/userService";
import { MinusCircleOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BillParentComponent from "../../../CommonComponents/billParentComponent";
import dayjs from "dayjs";
import PurchaseOrderService from "../../../../service/customizeServices/SupplierService/purchaseOrderService";
import TextArea from "antd/es/input/TextArea";

class PurchaseOrderFormClass extends BillParentComponent {
  service = new PurchaseOrderService();
  userService = new UserService();
  constructor() {
    super();
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    if (this.props.id) {
      this.setState({ mode: "update", id: this.props.id });
      this.service.getAll({ id: this.props.id }).then((res) => {
        if (this.form) {
          // Function to process nested objects and convert dates
          const processFormDataDeep = (data) => {
            if (typeof data !== "object" || data === null) {
              // Return non-object values as-is
              return data;
            }

            if (Array.isArray(data)) {
              // Process arrays recursively
              return data.map((item) => processFormDataDeep(item));
            }

            // Process objects
            return Object.fromEntries(
              Object.entries(data).map(([key, value]) => [
                key,
                key.toLowerCase().includes("date") && value
                  ? dayjs(value)
                  : processFormDataDeep(value),
              ])
            );
          };

          // Process the response data
          const processedFormData = processFormDataDeep(res.data.data[0]);

          // Set the processed data into the form
          this.props.form.setFieldsValue(processedFormData);
        }
      });
    }
  }

  save(data) {
    this.setState({ isLoading: true });
    if (this.state.mode === "add") {
      this.service
        .create(data)
        .then((res) => {
          message.success("Item Added successfully");
          this.props.formRef.current.resetFields();
          this.props.onSuccess();
        })
        .catch((err) => {
          message.error(err.response?.data?.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.service
        .updateItem(this.state.id, data)
        .then((res) => {
          message.success("Item Updated successfully");
          this.props.formRef.current.resetFields();
          this.props.onSuccess();
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form
          layout="vertical"
          onFinish={this.save}
          ref={this.props.formRef}
          onValuesChange={(changedValues, allValues) => {
            const orderTotal =
              allValues.purchaseProducts?.length > 0
                ? allValues.purchaseProducts
                    .map((e) => {
                      return (
                        (Number(e?.pricePerUnit) || 0) *
                        (Number(e?.quantity) || 0)
                      );
                    })
                    .reduce((e, total) => total + e, 0)
                : 0;
            if (this.props.formRef && this.props.formRef.current) {
              this.props.formRef.current.setFieldsValue({ orderTotal });
            }
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "10px 15px 15px",
            }}
          >
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select the status",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    options={[
                      { value: "Ordered", label: "Ordered" },
                      { value: "Pending", label: "Pending" },
                      { value: "Delivered", label: "Delivered" },
                      { value: "Canceled", label: "Canceled" },
                    ]}
                    className="input-tag-style"
                    disabled={this.state.mode==="view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="orderTotal"
                  label="Order Total (Auto calculated)"
                  className="form-input-tag-bottom-space"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the order total",
                    },
                  ]}
                >
                  <Input type="Number" className="input-tag-style" readOnly />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="deliveryDate"
                  label="Delivery Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the expected delivery date",
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
                  name={["supplier", "id"]}
                  label="Supplier"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the received person",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    options={this.props?.supplierData}
                    placeholder="Supplier"
                    className="input-tag-style"
                    style={{fontWeight:900}}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="remark"
                  label="Remark"
                  className="form-input-tag-bottom-space"
                >
                  <TextArea className="input-tag-style" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List name="purchaseProducts" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      <Table
                        bordered
                        dataSource={fields}
                        pagination={false}
                        rowKey={(field) => field.key}
                        scroll={{
                          x: "min-content",
                        }}
                        columns={[
                          {
                            title: "Product Name",
                            dataIndex: "productName",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "productName"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter Product Name",
                                  },
                                ]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  className="custom-select"
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                    backgroundColor: "white",
                                  }}
                                  placeholder="Product Name"
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Brand",
                            dataIndex: "brand",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "brand"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter brand",
                                  },
                                ]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                  placeholder="Brand"
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Variant",
                            dataIndex: "variant",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "variant"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter variant",
                                  },
                                ]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                  placeholder="Variant"
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Qty",
                            dataIndex: "quantity",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter quantity",
                                  },
                                ]}
                                style={{ margin: 0 }}
                                initialValue={1}
                              >
                                <Input
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                  placeholder="Quantity"
                                  type="number"
                                  min={1}
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Price per unit",
                            dataIndex: "pricePerUnit",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "pricePerUnit"]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  placeholder="Price per unit"
                                  type="number"
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                  }}
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Action",
                            dataIndex: "action",
                            onCell: () => ({
                              style: {
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) =>
                              fields.length > 1 ? (
                                <MinusCircleOutlined
                                  onClick={() => remove(field.name)}
                                  style={{ color: "red", fontSize: "16px" }}
                                />
                              ) : null,
                          },
                        ]}
                      />
                      <br />
                      <Flex justify="space-between">
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={this.state.isLoading}
                          icon={
                            <Spin
                              spinning={this.state.isLoading}
                              indicator={<SyncOutlined spin />}
                              style={{ color: "white" }}
                            />
                          }
                        >
                          {this.state.mode === "add" ? "Submit" : "Update"}
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add
                        </Button>
                      </Flex>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </div>
        </Form>
      </Spin>
    );
  }
}

const PurchaseOrderForm = (props) => {
  const navigate = useNavigate();
  return (
    <PurchaseOrderFormClass
      id={props.id}
      navigate={navigate}
      formRef={props.formRef}
      supplierData={props.supplierData}
      onSuccess={props.onSuccess}
    />
  );
};

export default PurchaseOrderForm;
