import {
  Button,
  ConfigProvider,
  Flex,
  Modal,
  Spin,
  Table,
  Tooltip,
} from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import InvoiceGenerationService from "../../../service/customizeServices/SalesAndBiling/invoiceGenerationService";
import TableParentPage from "../../../component/tableParentPage";
import { DateTimeFormat } from "../../../service/defaultServices/formates";
import InvoicePdf from "./invoice_pdf";
import { Link } from "react-router-dom";

class InvoiceHistoryForDashBoard extends TableParentPage {
  service = new InvoiceGenerationService();

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      // Common data
      data: [],
      formOpen: false,
      mode: null,
      id: null,
      isLoading: false,

      // Specific data
      isModelOpen: false,
      pdfData: null,
    };
  }

  columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (e) => e || "-",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (e) => `₹${e.toLocaleString()}` || "-",
    },
    {
      title: "Soled by",
      dataIndex: "soldBy",
      key: "soldBy",
      render: (e) => e.username || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e, record) => (
        <>
          <Tooltip title="Bill">
            <Button
              icon={<FilePdfOutlined />}
              style={{ color: "red" }}
              className="editDeleteButton"
              onClick={() => {
                this.setState({ isModelOpen: true, pdfData: record });
              }}
            />
          </Tooltip>
        </>
      ),
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
          <h3 style={{ paddingBottom: "5px" }}>Recent Sales</h3>
          <Link
            to="/sales-and-billing/invoice/history"
            style={{ color: "blue" }}
          >
            view more...
          </Link>
        </Flex>
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
            dataSource={this.state?.data.slice(0, 3)}
            columns={this.columns}
            scroll={{ x: "max-content" }}
            className="dashboardInvoiceTable"
          />
        </ConfigProvider>
        <Modal
          open={this.state.isModelOpen}
          width={840}
          onCancel={this.handleCancel}
          footer={false}
        >
          <InvoicePdf pdfData={this.state.pdfData} />
        </Modal>
      </Spin>
    );
  }
}

export default InvoiceHistoryForDashBoard;
