import TableParentPage from "../../../component/tableParentPage";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import SupplierService from "../../../service/customizeServices/SupplierService/supplierService";
import DashboardPurchaseOrderService from "../../../service/customizeServices/SupplierService/Dashboard/dashboardPurchaseOrderService";
import DashboardPaymentDetailsService from "../../../service/customizeServices/SupplierService/Dashboard/dashboardPaymentDetails";
import { DateFormat } from "../../../service/defaultServices/formates";
import { FaList } from "react-icons/fa";

class Dashboard extends TableParentPage {
  service = new DashboardPurchaseOrderService();
  supplierService = new SupplierService();
  paymentDetailsService = new DashboardPaymentDetailsService();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      supplierData: [],
      defaultSupplier: "",
      paymentData: [],
      formOpenProductList: false,
      puchaseOrderData: [],
      formOpen: false,
      mode: null,
      id: null,
    };
  }

  lastOrderColumns = [
    {
      title: "Order Items",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e) => (
        <Button
          // className="editDeleteButton"
          style={{ color: "green", border: "none", background: "transparent", height: "19px" }}
          onClick={() => {
            this.handleProductModule(e);
          }}
        >
          <FaList />
        </Button>
      ),
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
  ];

  lastTransactionColumns = [
    {
      title: "Method",
      dataIndex: "paymentMethod", // Accessing nested property
      key: "paymentMethod",
      render: (e) => e || "-",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus", // Accessing nested property
      key: "paymentStatus",
      render: (e) => {
        if (e == "Completed") {
          return (
            (
              <Tag icon={<CheckCircleOutlined />} color="success">
                {e}
              </Tag>
            ) || "-"
          );
        } else if (e == "Pending") {
          return (
            (
              <Tag icon={<SyncOutlined spin />} color="processing">
                {e}
              </Tag>
            ) || "-"
          );
        } else {
          return (
            (
              <Tag icon={<CloseCircleOutlined />} color="error">
                {e}
              </Tag>
            ) || "-"
          );
        }
      },
    },
    {
      title: "Trans.Id",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
      render: (e) => e || "-",
    },
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      key: "amount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Date",
      dataIndex: "paymentDate",
      key: "date",
      render: (e) => DateFormat(e) || "-",
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

  componentDidMount() {
    this.setState({ isLoading: true });
    this.supplierService
      .getAll()
      .then((res) => {  
        const filteredSupplierData = res.data.data?.map((supplier) => ({
          value: supplier.id,
          label: supplier.supplierName,
        }));
        this.setState({
          supplierData: filteredSupplierData,
          defaultSupplier: filteredSupplierData[0]?.label,
        });
        this.onSelectSupplier(filteredSupplierData[0]?.value);
      })
      .catch((err) => {
        console.log("err", err.response.data?.message);
        message.error(err.response.data?.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onSelectSupplier = (value) => {
    if (value) {
      this.paymentDetailsService.getSingleItem(value).then((res) => {
        this.setState({ paymentData: res.data?.data });
      });
      this.service.getSingleItem(value).then((res) => {
        this.setState({ puchaseOrderData: res.data?.data });
      });

      this.supplierService.getAll({ supplierId: value }).then((res) => {
        this.setState({ data: res.data?.data });
      });
    }
  };

  handleProductModule = (id) => {
    const order = this.state.puchaseOrderData.find((order) => order.id === id);
    this.setState({
      formOpenProductList: true,
      productData: order.purchaseProducts,
    });
  };

  handleCancelProductList = () => {
    this.setState({ formOpenProductList: false });
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <div>
          <Flex justify="space-between">
            <h2>Supplier Dashboard</h2>
            <Select
              showSearch
              placeholder="Select a supplier"
              optionFilterProp="label"
              style={{ minWidth: "200px" }}
              value={this.state?.defaultSupplier}
              options={this.state.supplierData}
              onSelect={this.onSelectSupplier}
            />
          </Flex>

          <Row style={{ marginTop: "10px" }}>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card bodyStyle={{ padding: 10 }} className="card-style card-one">
                <Flex>
                  <p className="icons"> 💰 </p>
                  <h4 className="title">Order Total</h4>
                </Flex>
                <Flex vertical>
                  <p className="inr-symbol">
                    {this.state.data[0]?.totalOrderValue.toLocaleString()}
                    <span className="span">₹</span>
                  </p>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card bodyStyle={{ padding: 10 }} className="card-style card-two">
                <Flex>
                  <p className="icons"> ✅ </p>
                  <h4 className="title">Paid</h4>
                </Flex>
                <Flex vertical>
                  <p className="inr-symbol">
                    {this.state.data[0]?.paidTotal.toLocaleString()}
                    <span className="span">₹</span>
                  </p>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card
                bodyStyle={{ padding: 10 }}
                className="card-style card-three"
              >
                <Flex>
                  <p className="icons"> ⚖️ </p>
                  <h4 className="title">Balance</h4>
                </Flex>
                <Flex vertical>
                  <p className="inr-symbol">
                    {this.state.data[0]?.balance.toLocaleString()}
                    <span className="span">₹</span>
                  </p>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
              <Card
                bodyStyle={{ padding: 10 }}
                className="card-style card-four"
              >
                <Flex>
                  <p className="icons"> 💸 </p>
                  <h4 className="title">Last Payment</h4>
                </Flex>
                <Flex vertical>
                  <p className="inr-symbol">
                    {this.state.data[0]?.lastPayment.toLocaleString()}
                    <span className="span">₹</span>
                  </p>
                </Flex>
              </Card>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Flex className="order-paymet-title" justify="space-between">
                <h4>Last Few Orders</h4>
                <Link
                  to="/inventory-management/supplier-management/purchase-orders"
                  className="nav-button"
                >
                  View More Orders
                </Link>
              </Flex>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      headerBg: "#D8BFD8",
                    },
                  },
                }}
              >
                <Table
                  columns={this.lastOrderColumns}
                  dataSource={this.state.puchaseOrderData}
                  scroll={{
                    x: "max-content",
                  }}
                  pagination={false}
                  cellFontSize={8}
                  cellPaddingInlineMD={0}
                />
              </ConfigProvider>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Flex className="order-paymet-title" justify="space-between">
                <h4>Last Few Transactions</h4>
                <Link
                  to="/inventory-management/supplier-management/payment"
                  className="nav-button"
                >
                  View More Payments
                </Link>
              </Flex>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      headerBg: "#7CB9E8",
                    },
                  },
                }}
              >
                <Table
                  dataSource={this.state?.paymentData}
                  columns={this.lastTransactionColumns}
                  scroll={{
                    x: "max-content",
                  }}
                  pagination={false}
                />
              </ConfigProvider>
            </Col>

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
                      headerBg: "#7CB9E8",
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
                  rowClassName="editable-row"
                />
              </ConfigProvider>
            </Modal>
          </Row>
        </div>
      </Spin>
    );
  }
}

export default Dashboard;
