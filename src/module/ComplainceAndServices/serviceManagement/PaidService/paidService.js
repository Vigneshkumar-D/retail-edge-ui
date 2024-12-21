import TableParentPage from "../../../../component/tableParentPage";
import {
  Button,
  ConfigProvider,
  Flex,
  Modal,
  Spin,
  Table,
  Tooltip,
} from "antd";
import Delete from "../../../../component/deleteButton";
import Edit from "../../../../component/editButton";
import { FilePdfOutlined, UserAddOutlined } from "@ant-design/icons";
import PaidServiceService from "../../../../service/customizeServices/ComplainceAndServices/ServiceManagement/paidServicesService";
import { Link } from "react-router-dom";
import { DateFormat, DateTimeFormat } from "../../../../service/defaultServices/formates";
import ServiceInvoicePdf from "./service_Invoice_pdf";

class PaidService extends TableParentPage {
  service = new PaidServiceService();
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
      render: (e) => {
        return e?.phoneNumber;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (e) => e || "-",
    },
    {
      title: "Sparepart Description",
      dataIndex: "sparePartDescription",
      key: "sparePartDescription",
      render: (e) => e || "-",
    },
    {
      title: "Sparepart Cost",
      dataIndex: "sparePartCost",
      key: "sparePartCost",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Customer Cost",
      dataIndex: "customerCost",
      key: "customerCost",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Profit Margin",
      dataIndex: "profitMargin",
      key: "profitMargin",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Advance Payment",
      dataIndex: "advancePayment",
      key: "advancePayment",
      render: (e) => `₹${e.toLocaleString()}` || "-",
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
      render: (e) => {
        return (
          <>
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <Link
              to={`/complaince-and-services/service-management/paid-service/update/${e}`}
            >
              <Edit />
            </Link>
            <Tooltip title="Bill">
              <Button
                icon={<FilePdfOutlined />}
                style={{ color: "red" }}
                className="editDeleteButton"
                onClick={() => {
                  this.setState({ isModelOpen: true });
                  // this.setState({ pdfData: record });
                }}
              />
            </Tooltip>
          </>
        );
      },
      fixed: "right",
    },
  ];
  handleCancel = () => {
    this.setState({ isModelOpen: false });
    this.setState({ pdfData: null });
  };
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Flex justify="space-between">
          <h2>Paid Service</h2>
          <Link to="/complaince-and-services/service-management/paid-service/new">
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
          open={this.state.isModelOpen}
          width={590}
          onCancel={this.handleCancel}
          footer={false}
          className="paid-service-invoice-model"
          style={{padding:"10px"}}
        >
            <ServiceInvoicePdf psfData={this.state.psfData}/>
        </Modal>
      </Spin>
    );
  }
}

export default PaidService;
