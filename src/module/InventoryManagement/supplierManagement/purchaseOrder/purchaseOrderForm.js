// import {
//   Button,
//   Col,
//   DatePicker,
//   Flex,
//   Form,
//   Input,
//   Row,
//   Select,
//   Spin,
//   Table,
// } from "antd";
// import UserService from "../../../../service/customizeServices/UserManagements/userService";
// import {
//   ArrowLeftOutlined,
//   MinusCircleOutlined,
//   PlusOutlined,
// } from "@ant-design/icons";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import BillParentComponent from "../../../CommonComponents/billParentComponent";
// import dayjs from "dayjs";
// import PurchaseOrderService from "../../../../service/customizeServices/SupplierService/purchaseOrderService";

// class PurchaseOrderFormClass extends BillParentComponent {
//   service = new PurchaseOrderService();
//   userService = new UserService();
//   constructor() {
//     super();
//     this.state = {
//       ...this.state,
//     };
//   }
//   // updateUrl = "/sales-and-billing/order/history";
//   componentDidMount() {
//     if (this.props.id) {
//       this.setState({ mode: "update", id: this.props.id });
//       this.service.getAll({ id: this.props.id }).then((res) => {
//         if (this.form) {
//           // Function to process nested objects and convert dates
//           const processFormDataDeep = (data) => {
//             if (typeof data !== "object" || data === null) {
//               // Return non-object values as-is
//               return data;
//             }

//             if (Array.isArray(data)) {
//               // Process arrays recursively
//               return data.map((item) => processFormDataDeep(item));
//             }

//             // Process objects
//             return Object.fromEntries(
//               Object.entries(data).map(([key, value]) => [
//                 key,
//                 key.toLowerCase().includes("date") && value
//                   ? dayjs(value)
//                   : processFormDataDeep(value),
//               ])
//             );
//           };

//           // Process the response data
//           const processedFormData = processFormDataDeep(res.data.data[0]);

//           // Set the processed data into the form
//           this.props.form.setFieldsValue(processedFormData);
//         }
//       });
//     }
//   }
//   render() {
//     return (
//       <Spin spinning={this.state.isLoading}>
//         <Form
//           layout="vertical"
//           onFinish={this.save}
//           onValuesChange={(changedValues, allValues) => {
//             const balanceAmount =
//               (allValues.totalAmount || 0) - (allValues.advanceAmount || 0);
//             this.form.setFieldsValue({
//               balanceAmount,
//             });
//           }}
//           ref={this.props.formRef}
//         >
//           <Row gutter={[10, 10]}>
//             <Col xs={24} lg={16}>
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   borderRadius: "5px",
//                   padding: "10px 15px 15px",
//                 }}
//               >
//                 <Link to="/sales-and-billing/order/history">
//                   <Flex>
//                     <ArrowLeftOutlined />
//                     <h3 style={{ color: "blue", paddingLeft: "5px" }}>Order</h3>
//                   </Flex>
//                 </Link>
//                 <hr
//                   style={{
//                     border: "none", // Removes the default border
//                     height: "2px", // Sets the line thickness
//                     backgroundColor: "#f2f2f0", // Sets the line color
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <Row gutter={[5, 5]}>
//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name="status"
//                       label="Status"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please select the status",
//                         },
//                       ]}
//                       className="form-input-tag-bottom-space"
//                     >
//                       <Select
//                         options={[
//                           { value: "Ordered", label: "Ordered" },
//                           { value: "Pending", label: "Pending" },
//                           { value: "Delivered", label: "Delivered" },
//                           { value: "Canceled", label: "Canceled" },
//                         ]}
//                         className="input-tag-style"
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name="totalAmount"
//                       label="Total Amount"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter the total asmount",
//                         },
//                       ]}
//                       className="form-input-tag-bottom-space"
//                     >
//                       <Input type="Number" className="input-tag-style" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name="advanceAmount"
//                       label="Advance Amount"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter the advance asmount",
//                         },
//                       ]}
//                       className="form-input-tag-bottom-space"
//                     >
//                       <Input type="Number" className="input-tag-style" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name="balanceAmount"
//                       label="Balance Amount"
//                       className="form-input-tag-bottom-space"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter the balance amount",
//                         },
//                       ]}
//                     >
//                       <Input
//                         type="Number"
//                         className="input-tag-style"
//                         readOnly
//                       />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name="expectedDeliveryDate"
//                       label="Expected Deliverydate"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter the expected delivery date",
//                         },
//                       ]}
//                       className="form-input-tag-bottom-space"
//                     >
//                       <DatePicker
//                         style={{ width: "100%" }}
//                         className="input-tag-style"
//                         format="YYYY-MM-DD"
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={12}>
//                     <Form.Item
//                       name={["supplier", "id"]}
//                       label="Supplier"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please enter the received person",
//                         },
//                       ]}
//                       className="form-input-tag-bottom-space"
//                     >
//                       <Select
//                         options={this.props?.supplierData}
//                         placeholder="Supplier"
//                         className="input-tag-style"
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col span={24}>
//                     <Form.List name="purchaseProducts">
//                       {(fields, { add, remove }) => (
//                         <>
//                           <Table
//                             bordered
//                             dataSource={fields}
//                             pagination={false}
//                             rowKey={(field) => field.key}
//                             scroll={{
//                               x: "min-content",
//                             }}
//                             columns={[
//                               {
//                                 title: "Product Name",
//                                 dataIndex: "productName",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "right",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) => (
//                                   <Form.Item
//                                     {...field}
//                                     name={[field.name, "productName"]}
//                                     rules={[
//                                       {
//                                         required: true,
//                                         message: "Enter Product Name",
//                                       },
//                                     ]}
//                                     style={{ margin: 0 }}
//                                   >
//                                     <Input
//                                       className="custom-select"
//                                       style={{
//                                         border: "none",
//                                         boxShadow: "none",
//                                         backgroundColor: "white",
//                                       }}
//                                       placeholder="Product Name"
//                                     />
//                                   </Form.Item>
//                                 ),
//                               },
//                               {
//                                 title: "Brand",
//                                 dataIndex: "brand",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "right",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) => (
//                                   <Form.Item
//                                     {...field}
//                                     name={[field.name, "brand"]}
//                                     rules={[
//                                       {
//                                         required: true,
//                                         message: "Enter brand",
//                                       },
//                                     ]}
//                                     style={{ margin: 0 }}
//                                   >
//                                     <Input
//                                       style={{
//                                         border: "none",
//                                         boxShadow: "none",
//                                       }}
//                                       placeholder="Brand"
//                                     />
//                                   </Form.Item>
//                                 ),
//                               },
//                               {
//                                 title: "Variant",
//                                 dataIndex: "variant",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "right",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) => (
//                                   <Form.Item
//                                     {...field}
//                                     name={[field.name, "variant"]}
//                                     rules={[
//                                       {
//                                         required: true,
//                                         message: "Enter variant",
//                                       },
//                                     ]}
//                                     style={{ margin: 0 }}
//                                   >
//                                     <Input
//                                       style={{
//                                         border: "none",
//                                         boxShadow: "none",
//                                       }}
//                                       placeholder="Variant"
//                                     />
//                                   </Form.Item>
//                                 ),
//                               },
//                               {
//                                 title: "Qty",
//                                 dataIndex: "quantity",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "right",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) => (
//                                   <Form.Item
//                                     {...field}
//                                     name={[field.name, "quantity"]}
//                                     rules={[
//                                       {
//                                         required: true,
//                                         message: "Enter quantity",
//                                       },
//                                     ]}
//                                     style={{ margin: 0 }}
//                                     initialValue={1}
//                                   >
//                                     <Input
//                                       style={{
//                                         border: "none",
//                                         boxShadow: "none",
//                                       }}
//                                       placeholder="Quantity"
//                                       type="number"
//                                       min={1}
//                                     />
//                                   </Form.Item>
//                                 ),
//                               },
//                               {
//                                 title: "Price",
//                                 dataIndex: "pricePerUnit",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "right",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) => (
//                                   <Form.Item
//                                     {...field}
//                                     name={[field.name, "pricePerUnit"]}
//                                     style={{ margin: 0 }}
//                                   >
//                                     <Input
//                                       placeholder="Price"
//                                       type="number"
//                                       style={{
//                                         border: "none",
//                                         boxShadow: "none",
//                                       }}
//                                     />
//                                   </Form.Item>
//                                 ),
//                               },
//                               {
//                                 title: "Action",
//                                 dataIndex: "action",
//                                 onCell: () => ({
//                                   style: {
//                                     textAlign: "center",
//                                     padding: "0px",
//                                     margin: "0px",
//                                   },
//                                 }),
//                                 render: (_, field) =>
//                                   fields.length > 1 ? (
//                                     <MinusCircleOutlined
//                                       onClick={() => remove(field.name)}
//                                       style={{ color: "red", fontSize: "16px" }}
//                                     />
//                                   ) : null,
//                               },
//                             ]}
//                           />
//                           <br />
//                           <Flex justify="space-between">
//                             <Button type="primary" htmlType="submit">
//                               {this.state.mode === "add" ? "Submit" : "Update"}
//                             </Button>
//                             <Button
//                               type="primary"
//                               onClick={() => add()}
//                               icon={<PlusOutlined />}
//                             >
//                               Add
//                             </Button>
//                           </Flex>
//                         </>
//                       )}
//                     </Form.List>
//                   </Col>
//                 </Row>
//               </div>
//             </Col>
//           </Row>
//         </Form>
//       </Spin>
//     );
//   }
// }

// const PurchaseOrderForm = (props) => {
//   const navigate = useNavigate();
//   return (
//     <PurchaseOrderFormClass
//       id={props.id}
//       navigate={navigate}
//       formRef={props.formRef}
//       supplierData={props.supplierData}
//     />
//   );
// };

// export default PurchaseOrderForm;

import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import UserService from "../../../../service/customizeServices/UserManagements/userService";
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  // updateUrl = "/sales-and-billing/order/history";
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
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form
          layout="vertical"
          onFinish={this.save}
          ref={this.props.formRef}
          onValuesChange={(changedValues, allValues) => {
            const orderTotal = allValues.purchaseProducts
              .map((e) => {
                return (
                  (Number(e?.pricePerUnit) || 0) * (Number(e?.quantity) || 0)
                );
              })
              .reduce((e, total) => total + e, 0);
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
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="orderTotal"
                  label="Order Total"
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
                <Form.List name="purchaseProducts">
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
                            title: "Price",
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
                                  placeholder="Price"
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
                        <Button type="primary" htmlType="submit">
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
    />
  );
};

export default PurchaseOrderForm;
