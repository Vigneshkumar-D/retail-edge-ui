import { Button, ConfigProvider, Modal, Spin, Table, Tooltip } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import InvoiceGenerationService from "../../../service/customizeServices/SalesAndBiling/invoiceGenerationService";
import TableParentPage from "../../../component/tableParentPage";
import Delete from "../../../component/deleteButton";
import { DateTimeFormat } from "../../../service/defaultServices/formates";
import InvoicePdf from "./invoice_pdf";
import Edit from "../../../component/editButton";
import { Link } from "react-router-dom";

class InvoiceHistory extends TableParentPage {
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
    };
  }

  columns = [
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e?.name || "-",
      fixed: "left",
    },
    {
      title: "Phone Number",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e?.phoneNumber || "-",
      fixed: "left",
    },
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
      render: (e, record) => (
        <>
          <Delete id={e} deleteItem={() => this.delete(e)} />
          <Link to={`/sales-and-billing/invoice/update/${e}`}>
            <Edit />
          </Link>
          <Tooltip title="Bill">
            <Button
              icon={<FilePdfOutlined />}
              style={{ color: "red" }}
              className="editDeleteButton"
              onClick={() => {
                this.setState({ isModelOpen: true });
                this.setState({ pdfData: record });
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
        <h2>Invoice</h2>
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
            dataSource={this.state?.data}
            columns={this.columns}
            scroll={{ x: "max-content" }}
            // style={{borderRadius:"12px",overflow:"hidden"}}
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

export default InvoiceHistory;
