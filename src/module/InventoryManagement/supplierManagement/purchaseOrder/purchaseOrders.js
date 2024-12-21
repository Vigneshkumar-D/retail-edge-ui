import TableParentPage from "../../../../component/tableParentPage";
import React from "react";
import { Button, ConfigProvider, Flex, message, Modal, Table } from "antd";
import Delete from "../../../../component/deleteButton";
import Edit from "../../../../component/editButton";
import PurchaseOrderService from "../../../../service/customizeServices/SupplierService/purchaseOrderService";
import SupplierService from "../../../../service/customizeServices/SupplierService/supplierService";
import { UserAddOutlined } from "@ant-design/icons";
import { FaList } from "react-icons/fa";

import { Form, Input, Popconfirm, Spin, Row, Col, Select } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import "../style.css";
import { DateFormat } from "../../../../service/defaultServices/formates";
import View from "../../../../component/viewButton";

class PurchaseOrder extends TableParentPage {
  service = new PurchaseOrderService();
  supplierService = new SupplierService();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      productData: [],
      supplierData: [],
      formOpen: false,
      mode: null,
      id: null,
      formOpenProductList: false,
      formOpenNewOrder: false,
      count: 1,
      dataSource: [
        {
          key: 0,
          productName: "",
          brand: "",
          variant: "",
          quantity: "",
          pricePerUnit: "",
        },
      ],
      supplierId: 0,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.supplierService.getAll().then((res) => {
      const filteredSupplierData = res.data.data.map((supplier) => ({
        value: supplier.id,
        label: supplier.supplierName,
      }));
      this.setState({ supplierData: filteredSupplierData });
    }).catch((err) => {
      message.error(err.response.data?.message);
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }

  handleProductModule = (id) => {
    const order = this.state.data.find((order) => order.id === id); // Find the order by id

    this.setState({
      formOpenProductList: true,
      productData: order.purchaseProducts,
    });
  };

  handleCancelProductList = () => {
    this.setState({ formOpenProductList: false });
  };

  orderColumn = [
    {
      title: "Supplier Name",
      dataIndex: ["supplier", "supplierName"],
      key: "supplierName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Order Total",
      dataIndex: "orderTotal",
      key: "orderTotal",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (e) => DateFormat(e) || "-",
    },
    {
      title: "Delivery Date",
      dataIndex: "actualDeliveryDate",
      key: "actualDeliveryDate",
      render: (e) => DateFormat(e) || "-",
    },

    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (e) => e || "-",
    },
    {
      title: "Order Items",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e) => (
        <Button
          className="editDeleteButton"
          style={{ border: "none", color: "green", background: "tranparent" }}
          onClick={() => {
            this.handleProductModule(e);
          }}
        >
          <FaList />
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      align: "center",
      render: (e) => {
        return (
          <>
            <Edit
              onClickFn={() => {
                this.editForm(e);
              }}
            />
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <View onClickFn={() => this.viewForm(e)} />
          </>
        );
      },
    },
  ];

  productColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (e) => e || "-",
      fixed: "left",
    },
    // {
    //   title: "Model",
    //   dataIndex: "model",
    //   key: "model",
    //   render: (e) => e || "-",
    // },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (e) => e || "-",
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (e) => e || "-",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (e) => e || "-",
    },
    {
      title: "Price Per Unit",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
  ];

  //editable table

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      productName: "",
      brand: "",
      variant: "",
      quantity: "",
      pricePerUnit: "",
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleDelete = (key) => {
    const { dataSource } = this.state;
    const newData = dataSource.filter((item) => item.key !== key);
    this.setState({ dataSource: newData });
  };

  handleSelect = (value) => {
    this.setState({ supplierId: value });
  };

  onFinish = (values) => {
    const { supplierId } = this.state;
    const purchaseProducts = values.productDetails || [];

    const orderTotal = purchaseProducts.reduce((total, product) => {
      const quantity = parseFloat(product.quantity) || 0;
      const pricePerUnit = parseFloat(product.pricePerUnit) || 0;
      return total + quantity * pricePerUnit;
    }, 0);

    const data = {
      supplierId,
      purchaseProductDto: [...values.productDetails],
      orderTotal,
      orderDate: new Date(),
    };

    this.service.create(data).then((res) => {
      if (res.status === 200) {
        this.setState({ formOpen: false });
      }
    });
  };

  handleCancelNewOrder = () => {
    this.setState({ formOpen: false });
  };

  newOrderColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => (
        <Form.Item
          name={["productDetails", record.key, "productName"]}
          rules={[{ required: true, message: "" }]}
          initialValue={record.productName}
          style={{ padding: "0px" }}
        >
          <Input placeholder="Product Name" className="custom-input" />
        </Form.Item>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_, record) => (
        <Form.Item
          name={["productDetails", record.key, "brand"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Brand" className="custom-input" />
        </Form.Item>
      ),
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
      render: (_, record) => (
        <Form.Item
          name={["productDetails", record.key, "variant"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Variant" className="custom-input" />
        </Form.Item>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Form.Item
          name={["productDetails", record.key, "quantity"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input
            placeholder="Quantity"
            className="custom-input"
            type="Number"
          />
        </Form.Item>
      ),
    },
    {
      title: "Price Per Unit",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (_, record) => (
        <Form.Item
          name={["productDetails", record.key, "pricePerUnit"]}
          rules={[{ required: true, message: "" }]}
        >
          <Input
            placeholder="Price per unit"
            className="custom-input"
            type="Number"
          />
        </Form.Item>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        this.state.dataSource?.length > 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.handleDelete(record.key)}
          >
            <Button type="text">
              <DeleteFilled style={{ color: "#e26363" }} />
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  render() {
    const { form, isLoading, dataSource, supplierData } = this.state;
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Purchase Order</h2>
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ formOpen: true, mode: "add" });
              }}
              icon={<UserAddOutlined />}
            >
              Add
            </Button>
          </div>
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
            columns={this.orderColumn}
            dataSource={this.state.data}
            pagination={{ pageSize: 10 }}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>

        <Modal
          title={"Purchase Order"}
          open={this.state.formOpen}
          onCancel={this.handleCancelNewOrder}
          footer={false}
          width={750}
        >
          <Spin spinning={isLoading}>
            <Select
              showSearch
              placeholder="Select a supplier"
              optionFilterProp="label"
              style={{ minWidth: "200px", marginBottom: "10px" }}
              options={supplierData}
              onSelect={this.handleSelect}
            />
            <br />
            <Form form={form} layout="vertical" onFinish={this.onFinish}>
              <Row gutter={[10, 10]}>
                <Col lg={24} sm={24} xs={24} className="custom-table-row">
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
                      components={{
                        body: {
                          cell: ({ children, ...restProps }) => (
                            <td {...restProps}>
                              <Form.Item noStyle>{children}</Form.Item>
                            </td>
                          ),
                        },
                      }}
                      dataSource={dataSource}
                      columns={this.newOrderColumns}
                      rowClassName="editable-row"
                      pagination={false}
                    />
                  </ConfigProvider>

                  <Row justify="end">
                    <Button
                      className="custom-btn"
                      size="small"
                      onClick={this.handleAdd}
                      style={{ marginTop: 16 }}
                    >
                      Add
                    </Button>
                  </Row>
                </Col>
              </Row>
              {this.state.mode === "view" || (
                <Row justify="end" gutter={[10, 10]} style={{ marginTop: 16 }}>
                  <Button type="primary" size="medium" htmlType="submit">
                    {this.state.mode == "add" ? "Add" : "Update"}
                  </Button>
                </Row>
              )}
            </Form>
          </Spin>
        </Modal>

        <Modal
          title={"Order Items"}
          open={this.state.formOpenProductList}
          onCancel={this.handleCancelProductList}
          footer={false}
          width={800}
        >
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
              columns={this.productColumns}
              dataSource={this.state.productData}
              scroll={{
                x: "max-content",
              }}
            />
          </ConfigProvider>
        </Modal>
      </Spin>
    );
  }
}

export default PurchaseOrder;
