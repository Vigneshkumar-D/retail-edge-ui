import TableParentPage from "../../../../component/tableParentPage";
import React from "react";
import { Button, ConfigProvider, Flex, message, Modal, Table } from "antd";
import Delete from "../../../../component/deleteButton";
import Edit from "../../../../component/editButton";
import PurchaseOrderService from "../../../../service/customizeServices/SupplierService/purchaseOrderService";
import SupplierService from "../../../../service/customizeServices/SupplierService/supplierService";
import { UserAddOutlined } from "@ant-design/icons";
import { FaList } from "react-icons/fa";

import { Spin } from "antd";
import "../style.css";
import { DateFormat } from "../../../../service/defaultServices/formates";
import View from "../../../../component/viewButton";
import PurchaseOrderForm from "./purchaseOrderForm";

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
    this.tableDataCall();
  }

  tableDataCall() {
    this.supplierService
      .getAll()
      .then((res) => {
        const filteredSupplierData = res.data.data.map((supplier) => ({
          value: supplier.id,
          label: supplier.supplierName,
        }));
        this.setState({ supplierData: filteredSupplierData });
      })
      .catch((err) => {
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

  render() {
    const { form, isLoading, dataSource, supplierData } = this.state;
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Purchase Order</h2>
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
            columns={this.orderColumn}
            dataSource={this.state.data}
            pagination={{ pageSize: 10 }}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>

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

        <Modal
          title={"Purchase Order"}
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
          width={800}
        >
          <PurchaseOrderForm
            formRef={this.formRef}
            supplierData={this.state.supplierData}
            id={this.state.id}
            onSuccess={() => {
              this.tableDataCall();
              this.setState({ formOpen: false });
            }}
          />
        </Modal>
      </Spin>
    );
  }
}

export default PurchaseOrder;
