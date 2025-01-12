import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import { EditOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import View from "../../component/viewButton";

import TextArea from "antd/es/input/TextArea";


import TableParentPage from "../../component/tableParentPage";

import { DateTimeFormat } from "../../service/defaultServices/formates";
import SettlementService from "../../service/customizeServices/FinanceManagement/settlement";
import UserService from "../../service/customizeServices/UserManagements/userService";

class Settlement extends TableParentPage {
  service = new SettlementService();
  // expenseCategoryService = new ExpenseCategoryService();
  userService = new UserService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
      categoryFormOpen: false,
      salesManList: [],
    };
  }
  columns = [
    {
      title: "Settled By",
      dataIndex: "user",
      key: "user",
      render: (e) => e.username || "-",
      fixed: "left",
    },
    {
      title: "Opening Cash",
      dataIndex: "previousDayCash",
      key: "previousDayCash",
      render: (e) => `₹${e}`, 
    },
    {
      title: "Total Amount",
      dataIndex: "totalCash",
      key: "totalCash",
      render: (e) => `₹${e}`,
    },
    {
      title: "Shortage",
      dataIndex: "shortage",
      key: "shortage",
      render: (e) => `₹${e}`,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (e) => e || "-",
    },
    {
      title: "Date",
      dataIndex: "settlementDate",
      key: "settlementDate",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      // width: "150px",
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
  componentDidMount() {
    super.componentDidMount();
    this.setState({ isLoading: true });
    this.userService
      .getAll()
      .then((res1) => {
        this.setState({ salesManList: res1.data.data, mode: "add" });
      })
      .catch((err) => message.error(err.response.data.message))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  categoryHandleCancel = () => {
    this.setState({ isLoading: true });
    this.setState({ categoryFormOpen: false, isLoading: false });
    this.componentDidMount();
  };
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Settlement</h2>
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
          title="Stock Transaction"
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
                  name="settlementDate"
                  label="Settlement Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the date",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <DatePicker
                    placeholder="Date"
                    className="input-tag-style"
                    disabled={this.state.mode === "view"}
                    style={{width:"100%"}}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={["user", "id"]}
                  label="Check By"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the checking person",
                    },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Select
                    options={this.state?.salesManList?.map((e) => ({
                      label: e.username,
                      value: e.id,
                    }))}
                    placeholder="Sold By"
                    className="input-tag-style"
                    disabled={this.state.mode === "view"}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="sales"
                  label="Sales Amount"
                  rules={[
                    { required: true, message: "Please enter the sales amount" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="service"
                  label="Service Amount"
                  rules={[
                    { required: true, message: "Please enter the service amount" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="ec"
                  label="EC Amount"
                  rules={[
                    { required: true, message: "Please enter the ec amount" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="expenses"
                  label="Expenses Amount"
                  rules={[
                    { required: true, message: "Please enter the expenses amount" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="previousDayCash"
                  label="Previous Day Cash"
                  rules={[
                    { required: true, message: "Please enter the previous day cash" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="totalCash"
                  label="Total Cash"
                  rules={[
                    { required: true, message: "Please enter the total cash" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="netCash"
                  label="Net Cash"
                  rules={[
                    { required: true, message: "Please enter the net cash" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="shortage"
                  label="Shortage"
                  rules={[
                    { required: true, message: "Please enter the shortage" },
                  ]}
                  className="form-input-tag-bottom-space"
                >
                  <Input
                    type="Number"
                    readOnly={this.state.mode === "view"}
                    className="input-tag-style"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="remark"
                  label="Remark"
                  className="form-input-tag-bottom-space"
                >
                  <TextArea
                     readOnly={this.state.mode === "view"}
                    className="input-tag-style"
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

export default Settlement;

// import TableParentPage from "../../component/tableParentPage";
// import {
//   Button,
//   Col,
//   ConfigProvider,
//   Flex,
//   Form,
//   Input,
//   Modal,
//   Radio,
//   Row,
//   Spin,
//   Table,
// } from "antd";
// import Delete from "../../component/deleteButton";
// import Edit from "../../component/editButton";
// import RoleService from "../../service/customizeServices/UserManagements/roleService";
// import { UserAddOutlined } from "@ant-design/icons";
// import { DateTimeFormat } from "../../service/defaultServices/formates";
// import View from "../../component/viewButton";
// import { Link } from "react-router-dom";
// import "../../App.css";

// class Settlement extends TableParentPage {
//   service = new RoleService();
//   constructor(props) {
//     super(props);
//     this.state = {
//       // common datas
//       data: [],
//       formOpen: false,
//       mode: null,
//       id: null,

//       // specific datas
//     };
//   }
//   columns = [
//     {
//       title: "Role Name",
//       dataIndex: "roleName",
//       key: "roleName",
//       render: (e) => e || "-",
//       fixed: "left",
//     },
//     {
//       title: "Active",
//       dataIndex: "active",
//       key: "active",
//       render: (e) => (e ? "Active" : "Inactive"),
//     },
//     {
//       title: "Created On",
//       dataIndex: "createdOn",
//       key: "createdOn",
//       render: (e) => DateTimeFormat(e) || "-",
//     },
//     {
//       title: "Updated On",
//       dataIndex: "updatedOn",
//       key: "updatedOn",
//       render: (e) => DateTimeFormat(e) || "-",
//     },
//     {
//       title: "Action",
//       dataIndex: "id",
//       key: "id",
//       align: "center",
//       width: "150px",
//       render: (e) => {
//         return (
//           <>
//             <Delete id={e} deleteItem={() => this.delete(e)} />
//             <Edit
//               onClickFn={() => {
//                 this.editForm(e);
//               }}
//             />
//             <View onClickFn={() => this.viewForm(e)} />
//           </>
//         );
//       },
//       fixed: "right",
//     },
//   ];
//   render() {
//     return (
//       <>
//         <div className="skills-main-container">
//           <img
//             src={`${process.env.PUBLIC_URL}/construction.jpg`}
//             className="under-const-image"
//             alt="under-construction-pic"
//           />
//           <h1 className="under-const-title">This page is under construction</h1>
//           <Link to="/">
//             <Button className="back-to-home-btn" type="primary">
//               Back to Home
//             </Button>
//           </Link>
//         </div>
//       </>
//     );
//   }
// }

// export default Settlement;
