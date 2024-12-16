import TableParentPage from "../../../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import Delete from "../../../../component/deleteButton";
import Edit from "../../../../component/editButton";
import { UserAddOutlined } from "@ant-design/icons";
import WarrantyServiceService from "../../../../service/customizeServices/ComplainceAndServices/ServiceManagement/warrantyServiceService";
import { Link } from "react-router-dom";
import { DateFormat } from "../../../../service/defaultServices/formates";

class WarrentService extends TableParentPage {
  service = new WarrantyServiceService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
    };
  }
  columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      render: (e) => {
        return `${e?.name}` || "-";
      },
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e.phoneNumber || "-",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (e) => e || "-",
    },
    {
      title: "Service Provider",
      dataIndex: "serviceProvider",
      key: "serviceProvider",
      render: (e) => e || "-",
    },
    {
      title: "Spare Part Description",
      dataIndex: "sparePartDescription",
      key: "sparePartDescription",
      render: (e) => e || "-",
    },
    {
      title: "Service Date",
      dataIndex: "serviceDate",
      key: "serviceDate",
      render: (e) => DateFormat(e) || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e) => {
        return (
          <>
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <Link
              to={`/complaince-and-services/service-management/warranty-service/update/${e}`}
            >
              <Edit />
            </Link>
          </>
        );
      },
      fixed: "right",
    },
  ];
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Warranty Service</h2>
          <Link to="/complaince-and-services/service-management/warranty-service/new">
            <Button type="primary" icon={<UserAddOutlined />}>
              Add
            </Button>
          </Link>
        </Flex>
        <br />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#bdbdd7",
              },
            },
          }}
        >
          <Table
            dataSource={this.state.data}
            columns={this.columns}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>
        <Modal
          title="Warranty Service"
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            ref={this.formRef} // Attach form reference
            name="form_item_path"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the code",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the code",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the code",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
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
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the brand",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="model"
                  label="Model"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the model",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="serviceProvider"
                  label="Service Provider"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Service Provider",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="sparePartDescription"
                  label="Spare Part Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Description",
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="warrantyStartDate"
                  label="Warranty Start Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter start date",
                    },
                  ]}
                >
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="warrantyEndDate"
                  label="Warranty End Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter warranty end",
                    },
                  ]}
                >
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="serviceDate"
                  label="Service Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter service date",
                    },
                  ]}
                >
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>

              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
                  <Button type="primary" htmlType="submit">
                    {this.state.mode == "add" ? "Add" : "Update"}
                  </Button>
                </Flex>
              )}
            </Row>
          </Form>
        </Modal>
      </Spin>
    );
  }
}

export default WarrentService;
