import React, { useRef, useState } from "react";
import "./paid_service_invoice.css";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Row,
  Table,
  Typography,
} from "antd";
import jsPDF from "jspdf";
import react, { useEffect } from "react";
import html2canvas from "html2canvas";
import { IndianDateTimeFormate } from "../../../../service/defaultServices/formates";
const { Title, Text } = Typography;

const pdfData = {
  id: 6,
  invoiceNumber: "PS-INV-0006",
  invoiceDate: "2024-12-19T18:30:00Z",
  lineItems: [
    {
      id: 29,
      product: {
        id: 11,
        productName: "Apple 15 pro",
        category: {
          id: 3,
          category: "Accessories",
        },
        stockLevel: 10,
        brand: "Apple",
        model: "15 pro Max",
        hsnCode: {
          id: 2,
          code: "Display Combo",
          description: "MOBILE",
          taxSlab: {
            id: 2,
            region: "TN",
            category: {
              id: 3,
              category: "Accessories",
            },
            sgst: 6.0,
            cgst: 6.0,
            igst: 6.0,
            serviceType: "6",
          },
        },
        lowStockThreshold: 10,
        actualPrice: 800.0,
        sellingPrice: 1000.0,
        variant: "werty",
        imeiNumber: null,
        status: null,
        barcodeImage:
          "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",
        barcode: "J8M50140",
      },
      quantity: 1,
      pricePerUnit: 2000.0,
      lineTotal: 2000.0,
      sgstAmount: 60.0,
      cgstAmount: 60.0,
      igstAmount: 60.0,
      totalTaxAmount: 180.0,
      discountAmount: 0.0,
    },
    {
      id: 22,
      product: {
        id: 22,
        productName: "walkman",
        category: {
          id: 3,
          category: "Accessories",
        },
        stockLevel: 89,
        brand: "Oppo",
        model: "5A",
        hsnCode: {
          id: 2,
          code: "Mic",
          description: "MOBILE",
          taxSlab: {
            id: 2,
            region: "TN",
            category: {
              id: 3,
              category: "Accessories",
            },
            sgst: 6.0,
            cgst: 6.0,
            igst: 6.0,
            serviceType: "6",
          },
        },
        lowStockThreshold: 10,
        actualPrice: 500.0,
        sellingPrice: 1200.0,
        variant: "5A",
        imeiNumber: null,
        status: null,
        barcodeImage:
          "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",
        barcode: "NT60UID0",
      },
      quantity: 1,
      pricePerUnit: 750.0,
      lineTotal: 750.0,
      sgstAmount: 0.0,
      cgstAmount: 0.0,
      igstAmount: 0.0,
      totalTaxAmount: 0.0,
      discountAmount: 0.0,
    },
  ],
  creditReminder: null,
  emiDetails: null,
  totalAmount: 2830.0,
  sgstAmount: 144.0,
  cgstAmount: 144.0,
  igstAmount: 144.0,
  roundOff: 0.0,
  totalTaxAmount: 432.0,
  totDiscountAmount: 0.0,
  paymentMethod: ["CASH"],
  customer: {
    id: 23,
    name: "Sasi Sekar",
    phoneNumber: "7092922321",
    email: "sasisekar.p@maxbytetech.com",
    dateOfBirth: null,
    address: "Thondamuthur",
    state: "Tamil Nadu",
    pinCode: 641109,
    gstin: null,
  },
  soldBy: {
    id: 1,
    username: "System User",
    email: "system@example.com",
    profileImage: null,
    mobileNumber: "9876543210",
    role: {
      id: 1,
      roleName: "System",
      active: true,
      createdOn: "2024-12-20T16:17:22.872269Z",
      updatedOn: "2024-12-20T16:17:23.020867Z",
    },
    active: true,
    lastLogin: null,
  },
  description: "otyui",
  cashPayment: 2832.0,
  pricePerUnit: 2400.0,
  upiId: null,
  upiTransactionId: null,
  upiApp: null,
  upiPayment: null,
  cardHolderName: null,
  cardType: null,
  cardTransactionId: null,
  cardPayment: null,
};
const desiredTableSize = 12;

const ServiceInvoicePdf = (props) => {
  const [updatedData, setUpdatedData] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const formattedData = pdfData.lineItems.map((item, index) => {
      const product = item.product;
      return {
        key: String(index + 1),
        srNo: index + 1,
        productName: `${product.productName} ${product.brand} ${product.model}\nIMEI: ${product.imeiNumber}`,
        hsn: product.hsnCode.code || "N/A",
        qty: String(item.quantity),
        rate: String(item.pricePerUnit),
        taxableValue: String(item.lineTotal),
        cgst: String(item.hsnCode?.taxSlab?.cgst || 0),
        sgst: String(item.hsnCode?.taxSlab?.sgst || 0),
        cgstAmount: String(item.cgstAmount || 0),
        sgstAmount: String(item.sgstAmount || 0),
        total: String(item.lineTotal + item.totalTaxAmount || item.lineTotal),
      };
    });
    const adjustedData = Array.from({ length: desiredTableSize }, (_, i) => {
      if (i < formattedData.length) {
        return formattedData[i]; // Use actual data if available
      }
      // Placeholder row to maintain table size
      return {
        key: String(i + 1),
        srNo: "",
        productName: "",
        hsn: "",
        qty: "",
        rate: "",
        taxableValue: "",
        igst: "",
        igstAmount: "",
        total: "",
      };
    });
    setUpdatedData(adjustedData);
  }, [pdfData]); // Add pdfData as a dependency

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    // Apply A4-specific styles for printing
    // const style = `
    // @media print {
    //     @page {
    //         size: 566px 794px; /* Landscape orientation */
    //         margin: 5mm;
    //     }
    //     body {
    //         margin: 0;
    //         padding: 0;
    //     }
    //     .no-print {
    //         display: none;
    //     }
    //     .print-container {
    //         height: 794px;
    //         width: 566px;
    //         margin: 10px; /* Center the content */
    //     }
    // }`;

    const style = `
    @media print {
        @page {
            size: 148mm 210mm; /* A5 size */
            margin: 0mm;
        }
        body {
            margin: 0;
            padding: 0;
        }
        .no-print {
            display: none;
        }
        .print-container {
            height: 210mm;
            width: 148mm;
            margin: 0mm; /* Center the content */
        }
          @page {
            margin-top: 0mm;
            margin-bottom: 0mm;
        }
        body {
            margin-top: 0mm;
            margin-bottom: 0mm;
        }
    }`;

    const printStyle = document.createElement("style");
    printStyle.innerHTML = style;
    document.head.appendChild(printStyle);

    // Wrap content in a div with a specific class for scaling
    const printContainer = document.createElement("div");
    printContainer.className = "print-container";
    printContainer.innerHTML = printContent.innerHTML;

    // Set the body content to the print version
    document.body.innerHTML = printContainer.outerHTML;
    window.print();

    // Restore original content
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content"); // Select the part of the page you want to export
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "srNo",
      key: "srNo",
      align: "center",
      // render: (_, record, index) => (record.productName ? index + 1 : " "),
    },
    {
      title: "Descriptions of Goods",
      dataIndex: "productName",
      key: "productName",
      align: "center",
      width: 200,
    },
    {
      title: "Complaint Description",
      dataIndex: "hsn",
      key: "hsn",
      align: "center",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text) => (text ? `₹${text.toLocaleString()}` : " "),
    },
  ];

  return (
    <div style={{ minHeight: "800px", width: "570px" }}>
      <div
        style={{
          background: "#f5f5f5",
          margin: "0px",
          fontSize: "10px",
          minHeight: "800px",
          width: "570px",
          borderRadius: "10px",
        }}
        id="pdf-content"
      >
        <Card
          className="invoice-card-container"
          ref={printRef}
          style={{
            height: "794px",
            width: "566px",
            padding: "15px",
            border: "none",
          }}
        >
          <Row justify={"space-between"} align="middle">
            <Col>
              <img
                src={`${process.env.PUBLIC_URL}/client-logo.png`}
                alt="Shop Logo"
                style={{ height: 50, width: 70 }}
              />
            </Col>
            <Col style={{}}>
              <Title
                style={{ margin: "0px", fontSize: "17px", color: "#057cbd" }}
              >
                Sri Murugan Mobiles
              </Title>
              <Text style={{ fontSize: "10px", lineHeight: "1.2" }}>
                G/456, Basant Lok Comm, Vasant Vihar,
                <br style={{ lineHeight: "0", margin: "0" }} />
                Tardeo Road,Maharashtra - 400001
                <br style={{ lineHeight: "0", margin: "0" }} />
                Ph: 111 2222 3333
              </Text>
            </Col>
            <Col justify="end">
              <img
                src={`${process.env.PUBLIC_URL}/brand-logo.png`}
                alt="Brand Logo"
                style={{ height: 55 }}
              />
            </Col>
          </Row>
          <hr style={{ height: "1px", backgroundColor: "black" }} />
          <Row justify="center">
            <Col>
              <Text strong>SERVICE INVOICE</Text>
            </Col>
          </Row>
          <hr style={{ height: "2px", backgroundColor: "#057cbd" }} />

          {/* Customer Details */}
          <Row gutter={2} style={{ marginTop: 4 }}>
            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card
                  className="invoice-card"
                  bordered
                  title="Customer Details"
                >
                  <Col justify={"space-between"}>
                    <Row>
                      <Col span={24} style={{ height: "17px" }}>
                        <Text>
                          {/* Admin */}
                          <strong>Name:</strong> {pdfData?.customer?.name}
                        </Text>
                      </Col>
                      <Col span={24} style={{ height: "17px" }}>
                        <Text>
                          <strong>Address:</strong> {pdfData?.customer?.address}
                        </Text>
                      </Col>
                      <Col span={12} style={{ height: "17px" }}>
                        <Text>
                          <strong>State:</strong> {pdfData?.customer?.state}
                        </Text>
                      </Col>

                      <Col span={12} style={{ height: "17px" }}>
                        <Text>
                          <strong>Pin code:</strong>{" "}
                          {pdfData?.customer?.pinCode}
                        </Text>
                      </Col>
                      <Col span={12} style={{ height: "17px" }}>
                        <Text>
                          <strong>Phone:</strong>{" "}
                          {pdfData?.customer?.phoneNumber}
                        </Text>
                      </Col>
                      {/* {pdfData.customer.email && (
                        <Col span={24} style={{height:"17px"}}>
                          <Text>
                            <strong>Email:</strong> {pdfData?.customer?.email}
                          </Text>
                        </Col>
                      )} */}
                    </Row>
                  </Col>
                </Card>
              </ConfigProvider>
            </Col>
            <Col span={12}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card
                  className="invoice-card"
                  style={{ textAlign: "left" }}
                  bordered
                  title="Invoice Details"
                >
                  <Row>
                    <Col span={24} style={{ height: "17px" }}>
                      <Text>
                        <strong>Invoice No:</strong> {pdfData?.invoiceNumber}
                      </Text>
                    </Col>
                    <Col span={24} style={{ height: "17px" }}>
                      <Text>
                        <strong>Invoice Date:</strong>{" "}
                        {IndianDateTimeFormate(pdfData?.invoiceDate)}
                      </Text>
                    </Col>
                    <Col span={24} style={{ height: "17px" }}>
                      <Text>
                        <strong>Advance:</strong> ₹{" "}
                        {pdfData?.creditReminder?.totalCreditAmount}
                      </Text>
                    </Col>
                    <Col span={12} style={{ height: "17px" }}>
                      <Text>
                        <strong>Credit:</strong> ₹{" "}
                        {pdfData?.creditReminder?.totalCreditAmount}
                      </Text>
                    </Col>
                    <Col span={12} style={{ height: "17px" }}>
                      <Text>
                        <strong>Balance:</strong> ₹{" "}
                        {pdfData?.creditReminder?.totalCreditAmount}
                      </Text>
                    </Col>

                    {/* )} */}
                  </Row>
                </Card>
              </ConfigProvider>
            </Col>
          </Row>

          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#cfe5f1",
                  headerBorderRadius: "0px",
                },
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={updatedData}
              pagination={false}
              rowClassName="editable-row"
              style={{ marginTop: 4, marginBottom: 4, borderColor: "#0d86c2" }}
              className="invoice-table"
              bordered
              summary={(pageData) => {
                let totalQty = 0;
                let totalRate = 0;
                let totalTaxableValue = 0;
                let totalSGSTAmount = 0;
                let totalCGSTAmount = 0;
                let grandTotal = 0;

                // Uncomment and calculate totals based on your data
                // pageData.forEach(({ qty, rate, taxableValue, SGSTAmount, CGSTAmount, total }) => {
                //   totalQty += parseFloat(qty || 0);
                //   totalRate += parseFloat(rate?.replace(/,/g, "") || 0);
                //   totalTaxableValue += parseFloat(taxableValue?.replace(/,/g, "") || 0);
                //   totalSGSTAmount += parseFloat(SGSTAmount?.replace(/,/g, "") || 0);
                //   totalCGSTAmount += parseFloat(CGSTAmount?.replace(/,/g, "") || 0);
                //   grandTotal += parseFloat(total?.replace(/,/g, "") || 0);
                // });

                return (
                  <>
                    {/* Adding a spacer row before the summary */}

                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2}>
                        <Row>
                          <Col span={12} style={{ textAlign: "start" }}>
                            <strong>E.&O.E</strong>
                          </Col>
                          <Col span={12} style={{ textAlign: "end" }}>
                            <strong>Total</strong>
                          </Col>
                        </Row>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} />
                      <Table.Summary.Cell index={10} align="right">
                        <strong>
                          ₹{pdfData?.totalAmount.toLocaleString("en-IN")}
                        </strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </ConfigProvider>

          <Row gutter={2}>
            <Col span={14}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card
                  className="terms-and-condition invoice-card"
                  style={{ marginTop: 2 }}
                  title="Terms and Conditions"
                >
                  <Row style={{ lineHeight: "10px", height: "51px" }}>
                    <Col span={24}>
                      {/* <Text
                        style={{
                          fontSize: "11px",
                          lineHeight: "5px !important",
                        }}
                      >
                        1. Payment must be made by the due date to avoid late fees or service suspension.
                      </Text> */}
                      {/* <br /> */}
                      <Text style={{ fontSize: "11px" }}>
                        1. The items must be collected within 7 days; otherwise,
                        the organization is not liable for any loss or damage.
                      </Text>
                      <br />
                      <Text style={{ fontSize: "11px" }}>
                        2. Service charges are non-refundable once utilized.
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </ConfigProvider>
            </Col>
            <Col span={10} style={{ marginTop: 2 }}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card className="paid-service-invoice-total-card">
                  <Row
                    style={{
                      borderBottom: "1px solid #057cbd",
                      height: "28px",
                    }}
                    justify={"space-between"}
                  >
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>Round Off(+/-):</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>₹0</strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row justify={"space-between"} style={{ height: "28px" }}>
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>Total Amount:</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>
                          ₹{pdfData?.totalAmount.toLocaleString("en-IN")}
                        </strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={{ borderTop: "1px solid #057cbd" }}
                    justify={"end"}
                  >
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>E.&O.E</strong>
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </ConfigProvider>
            </Col>
          </Row>

          <Row gutter={2}>
            <Col span={12} style={{ lineHeight: "13px" }}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card
                  className="invoice-card"
                  style={{ marginTop: 4, height: "130px" }}
                >
                  <Col span={24}>
                    <Row>
                      <Col
                        span={24}
                        style={{
                          textAlign: "center",
                          lineHeight: "13px",
                          marginTop: "0px",
                        }}
                      >
                        <Text style={{ lineHeight: "3px", fontSize: "11px" }}>
                          I authorize the service provider to perform the
                          requested repairs/services on my device and agree to
                          the terms and conditions.
                        </Text>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <Text
                          style={{
                            fontSize: "12px",
                            marginTop: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Customer's Signature
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </ConfigProvider>
            </Col>
            <Col span={12} style={{ lineHeight: "13px" }}>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      colorBorderSecondary: "#057cbd",
                    },
                  },
                }}
              >
                <Card
                  className="invoice-card"
                  style={{ marginTop: 4, height: "130px" }}
                >
                  <Col span={24}>
                    <Row>
                      <Col
                        span={24}
                        style={{
                          textAlign: "center",
                          lineHeight: "13px",
                          marginTop: "0px",
                        }}
                      >
                        <Text style={{ lineHeight: "3px", fontSize: "11px" }}>
                          We agree to perform the requested repairs/services as
                          per the terms and conditions provided to the customer.
                        </Text>
                        <br />

                        <Text
                          alignSelf={"center"}
                          style={{
                            fontSize: "11px",
                            fontSize: "15px",
                            fontWeight: "700",
                          }}
                        >
                          For Sri Murugan Mobiles
                        </Text>

                        <br />
                        <br />
                        <br />

                        <Text style={{ fontSize: "12px", fontWeight: "500" }}>
                          Authorised Signaure
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </ConfigProvider>
            </Col>
          </Row>
        </Card>
      </div>
      <Flex justify="flex-end">
        <Button onClick={handlePrint} type="primary">
          Print
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={generatePDF}
          type="primary"
        >
          Download
        </Button>
      </Flex>
    </div>
  );
};

export default ServiceInvoicePdf;
