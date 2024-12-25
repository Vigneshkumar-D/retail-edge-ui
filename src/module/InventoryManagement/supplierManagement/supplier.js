import TableParentPage from "../../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import Delete from "../../../component/deleteButton";
import Edit from "../../../component/editButton";

import "./style.css";
import SupplierService from "../../../service/customizeServices/SupplierService/supplierService";
import { SyncOutlined, UserAddOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import View from "../../../component/viewButton";

class Suppiler extends TableParentPage {
  service = new SupplierService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,
    };
  }

  columns = [
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Rep. Name",
      dataIndex: "contactName", // Accessing nested property
      key: "contactName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Rep. Email",
      dataIndex: "contactEmail", // Accessing nested property
      key: "contactEmail",
      render: (e) => e || "-",
    },
    {
      title: "Rep. Phone",
      dataIndex: "contactPhone", // Accessing nested property
      key: "contactPhone",
      render: (e) => e || "-",
    },
    {
      title: "Address",
      dataIndex: "address", // Accessing nested property
      key: "address",
      width: "250px",
      // render: (e) => (
      //   <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
      //     {e || "-"}
      //   </div>
      // ),

      render: (e) => (
        <Paragraph
          ellipsis={{
            rows: 1,
            expandable: true,
            symbol: "more",
          }}
        >
          {e || "-"}
        </Paragraph>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (e) => {
        return (
          <>
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <Edit
              onClickFn={() => {
                this.editForm(e);
              }}
            />
            <View onClickFn={() => this.viewForm(e)} />
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
          <h2>Supplier Details</h2>
          <Button
            type="primary"
            onClick={() => {
              this.setState({ formOpen: true, mode: "add" });
            }}
            icon={<UserAddOutlined />}
          >
            Add
          </Button>
        </Flex>
        <br />

        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#bdbdd7",
                //  borderColor:"#5aa3e4"
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
          title="Supplier Details"
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
                  name="supplierName"
                  label="Supplier Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the supplier name",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="contactName"
                  label="Representative Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact name",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="contactEmail"
                  label="Representative Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Contact Email",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="contactPhone"
                  label="Representative Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobile number!",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit mobile number!",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="tel"
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    { required: true, message: "Please enter the Address" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input.TextArea
                    className="input-tag-style"
                    readOnly={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              {this.state.mode === "view" || (
                <Flex justify="end" style={{ width: "100%" }}>
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

export default Suppiler;
