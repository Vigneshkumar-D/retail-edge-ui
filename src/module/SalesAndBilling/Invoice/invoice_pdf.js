// import React, { useRef } from "react";
// import "./invoice.css";
// import {
//   Card,
//   Col,
//   ConfigProvider,
//   Row,
//   Table,
//   Typography,
// } from "antd";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { IndianDateTimeFormate } from "../../../service/defaultServices/formates";
// const { Title, Text } = Typography;
// const numberToWords = require("number-to-words");

// const amount = 19999;
// const integerPart = Math.floor(amount); // Get the integer part

// // Convert integer part to words
// const integerInWords = numberToWords.toWords(integerPart);

// // Convert decimal part to words (optional, if you need it)
// // const decimalInWords = numberToWords.toWords(decimalPart);

// const InvoicePdf = (props) => {
//   const { pdfData } = props;
//   const componentRef = useRef();

//   const printRef = useRef();

//   const handlePrint = () => {
//     const printContent = printRef.current;
//     const originalContent = document.body.innerHTML;

//     // Apply A4-specific styles for printing
//     const style = `
//             @media print {
//                 @page {
//                     size: A4;
//                     margin: 5mm;
//                 }
//                 body {
//                     margin: 0;
//                     padding: 0;
//                 }
//                 .no-print {
//                     display: none;
//                 }

//             }
//         `;

//     const printStyle = document.createElement("style");
//     printStyle.innerHTML = style;
//     document.head.appendChild(printStyle);

//     // Wrap content in a div with a specific class for scaling
//     const printContainer = document.createElement("div");
//     printContainer.className = "print-container";
//     printContainer.innerHTML = printContent.innerHTML;

//     // Set the body content to the print version
//     document.body.innerHTML = printContainer.outerHTML;
//     window.print();

//     // Restore original content
//     document.body.innerHTML = originalContent;
//     window.location.reload();
//   };

//   const generatePDF = () => {
//     const element = document.getElementById("pdf-content"); // Select the part of the page you want to export
//     html2canvas(element, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("invoice.pdf");
//     });
//   };

//   const columns = [
//     {
//       title: "Sr.No.",
//       dataIndex: "srNo",
//       key: "srNo",
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: "Descriptions of Goods",
//       dataIndex: "productName",
//       key: "productName",
//       align: "center",
//     },
//     {
//       title: "HSN",
//       dataIndex: "hsn",
//       key: "hsn",
//       align: "center",
//     },
//     {
//       title: "Qty",
//       dataIndex: "qty",
//       key: "qty",
//       align: "center",
//     },
//     {
//       title: "Rate",
//       dataIndex: "rate",
//       key: "rate",
//       align: "center",
//       render: (text) => (text ? `₹${text.toLocaleString()}` : ""),
//     },
//     {
//       title: "Taxable Value",
//       dataIndex: "taxableValue",
//       key: "taxableValue",
//       align: "center",
//       render: (text) => (text ? `₹${text.toLocaleString()}` : " "),
//     },
//     {
//       title: "SGST",
//       children: [
//         {
//           title: "%",
//           dataIndex: "street",
//           key: "street",
//         },
//         {
//           title: "Amount",
//           dataIndex: "street",
//           key: "street",
//         },
//       ],
//     },
//     {
//       title: "CGST",
//       children: [
//         {
//           title: "%",
//           dataIndex: "street",
//           key: "street",
//         },
//         {
//           title: "Amount",
//           dataIndex: "street",
//           key: "street",
//         },
//       ],
//     },
//     {
//       title: "Total",
//       dataIndex: "total",
//       key: "total",
//       align: "center",
//       render: (text) => (text ? `₹${text.toLocaleString()}` : " "),
//     },
//   ];

//   const data = [
//     {
//       key: "1",
//       srNo: 1,
//       productName: "iPhone 15 Pro Max\nIMEI: 23453456432567",
//       hsn: "8517",
//       qty: "1",
//       rate: "180000",
//       taxableValue: "180000",
//       igst: "18.00",
//       igstAmount: "32400",
//       total: "212400",
//     },
//     {
//       key: "2",
//       srNo: 2,
//       productName: "20W USB-C Power Adapter",
//       hsn: "8517",
//       qty: "1",
//       rate: "2000",
//       taxableValue: "2000",
//       igst: "18.00",
//       igstAmount: "360",
//       total: "2360",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//     {
//       key: "",
//       productName: "",
//       hsn: "",
//       qty: "",
//       rate: "",
//       taxableValue: "",
//       igst: "",
//       igstAmount: "",
//       total: "",
//     },
//   ];

//   return (
//     <>
//       {console.log("pdf_data", pdfData)}
//       <div
//         style={{
//           background: "#f5f5f5",
//           margin: "0px",
//           fontSize: "10px",
//           minHeight: "1200px",
//         }}
//         id="pdf-content"
//       >
//         <Card
//           className="invoice-card-container"
//           ref={printRef}
//           style={{
//             width: "798px",
//             height: "1123px",
//             padding: "15px",
//             border: "none",
//           }}
//         >
//           <Row justify="space-between" align="middle">
//             <Col>
//               <img
//                 src={`${process.env.PUBLIC_URL}/client-logo.png`}
//                 alt="Shop Logo"
//                 style={{ height: 85 }}
//               />
//             </Col>
//             <Col>
//               <Title level={3} style={{ margin: "0px", color: "#057cbd" }}>
//                 Sri Murugan Mobiles
//               </Title>
//               <Text>
//                 G/456, Basant Lok Comm, Vasant Vihar,
//                 <br />
//                 Tardeo Road,Maharashtra - 400001
//                 <br />
//                 Ph: 111 2222 3333
//               </Text>
//             </Col>
//             <Col textAlign={"end"}>
//               <img
//                 src={`${process.env.PUBLIC_URL}/brand-logo.png`}
//                 alt="Brand Logo"
//                 style={{ height: 80 }}
//               />
//             </Col>
//           </Row>
//           <hr style={{ height: "2px", backgroundColor: "black" }} />

//           {/* <Divider style={{ padding: '1px', fontSize: "15px", margin: "0px" }}>
//                         <Text >
//                             Get All Your Desired Smart Phones From Apple To Vivo On Huge
//                             Discounts And Easy EMI
//                         </Text>
//                     </Divider> */}
//           {/* <hr style={{ height: '1px', backgroundColor: 'black', }} /> */}
//           <Row justify="space-between" style={{ padding: "2px" }}>
//             <Col>
//               <Text>
//                 <strong>GSTIN:</strong> 26CORPP3939N1ZA
//               </Text>
//             </Col>
//             <Col>
//               <Text strong>TAX INVOICE</Text>
//             </Col>
//             <Col>
//               <Text strong>ORIGINAL FOR RECIPIENT</Text>
//             </Col>
//           </Row>

//           <hr style={{ height: "1px", backgroundColor: "#057cbd" }} />

//           {/* Customer Details */}
//           <Row gutter={2} style={{ marginTop: 4 }}>
//             <Col span={12}>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card
//                   className="invoice-card"
//                   bordered
//                   title="Customer Details"
//                 >
//                   {/* <Title level={7}>Customer Detail</Title> */}
//                   <Col justify={"space-between"}>
//                     <Row>
//                       <Col span={24}>
//                         <Text>
//                           <strong>Name:</strong> {pdfData?.customer?.name}
//                         </Text>
//                       </Col>
//                       <Col span={24}>
//                         <Text>
//                           <strong>Address:</strong> {pdfData?.customer?.address}
//                         </Text>
//                       </Col>
//                       <Col span={12}>
//                         <Text>
//                           <strong>State:</strong> {pdfData?.customer?.state}
//                         </Text>
//                       </Col>
//                       <Col span={12}>
//                         <Text>
//                           <strong>Pin code:</strong>{" "}
//                           {pdfData?.customer?.pinCode}
//                         </Text>
//                       </Col>
//                       <Col span={12}>
//                         <Text>
//                           <strong>Phone:</strong>{" "}
//                           {pdfData?.customer?.phoneNumber}
//                         </Text>
//                       </Col>
//                       {pdfData.customer.email && (
//                         <Col span={12}>
//                           <Text>
//                             <strong>Email:</strong> {pdfData?.customer?.email}
//                           </Text>
//                         </Col>
//                       )}
//                       {pdfData.customer.gstin && (
//                         <Col span={12}>
//                           <Text>
//                             <strong>GSTIN:</strong> {pdfData?.customer?.gstin}
//                           </Text>
//                         </Col>
//                       )}
//                     </Row>
//                   </Col>
//                 </Card>
//               </ConfigProvider>
//             </Col>
//             <Col span={12}>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card
//                   className="invoice-card"
//                   style={{ textAlign: "left" }}
//                   bordered
//                   title="Invoice Details"
//                 >
//                   <Row>
//                     <Col span={24}>
//                       <Text>
//                         <strong>Invoice No:</strong> {pdfData?.invoiceNumber}
//                       </Text>
//                     </Col>
//                     <Col span={24}>
//                       <Text>
//                         <strong>Invoice Date:</strong>{" "}
//                         {IndianDateTimeFormate(pdfData?.invoiceDate)}
//                       </Text>
//                     </Col>
//                     {pdfData.emiDetails && (
//                       <>
//                         <Col span={24}>
//                           <Text>
//                             <strong>Finance:</strong>{" "}
//                             {pdfData?.emiDetails?.financeProvider}
//                           </Text>
//                         </Col>
//                         <Col span={24}>
//                           <Text>
//                             <strong>D.O/D.A Number:</strong> {pdfData?.emiDetails?.dadoNumber}
//                           </Text>
//                         </Col>
//                       </>
//                     )}
//                     {pdfData.creditReminder && (
//                       <Col span={24}>
//                         <Text>
//                           <strong>Credit:</strong> ₹ {pdfData?.creditReminder?.totalCreditAmount}
//                         </Text>
//                       </Col>
//                     )}
//                   </Row>
//                 </Card>
//               </ConfigProvider>
//             </Col>
//           </Row>

//           <ConfigProvider
//             theme={{
//               components: {
//                 Table: {
//                   headerBg: "#cfe5f1",
//                   headerBorderRadius: "0px",
//                   // borderColor: "#057cbd",
//                 },
//               },
//             }}
//           >
//             <Table
//               columns={columns}
//               dataSource={data}
//               pagination={false}
//               rowClassName="editable-row"
//               style={{ marginTop: 4, marginBottom: 4, borderColor: "#0d86c2" }}
//               className="invoice-table"
//               bordered
//               summary={(pageData) => {
//                 let totalQty = 0;
//                 let totalRate = 0;
//                 let totalTaxableValue = 0;
//                 let totalSGSTAmount = 0;
//                 let totalCGSTAmount = 0;
//                 let grandTotal = 0;

//                 // Uncomment and calculate totals based on your data
//                 // pageData.forEach(({ qty, rate, taxableValue, SGSTAmount, CGSTAmount, total }) => {
//                 //   totalQty += parseFloat(qty || 0);
//                 //   totalRate += parseFloat(rate?.replace(/,/g, "") || 0);
//                 //   totalTaxableValue += parseFloat(taxableValue?.replace(/,/g, "") || 0);
//                 //   totalSGSTAmount += parseFloat(SGSTAmount?.replace(/,/g, "") || 0);
//                 //   totalCGSTAmount += parseFloat(CGSTAmount?.replace(/,/g, "") || 0);
//                 //   grandTotal += parseFloat(total?.replace(/,/g, "") || 0);
//                 // });

//                 return (
//                   <>
//                     {/* Adding a spacer row before the summary */}

//                     <Table.Summary.Row>
//                       <Table.Summary.Cell index={0} colSpan={2}>
//                         <Row>
//                           <Col span={12} style={{ textAlign: "start" }}>
//                             <strong>E.&O.E</strong>
//                           </Col>
//                           <Col span={12} style={{ textAlign: "end" }}>
//                             <strong>Total</strong>
//                           </Col>
//                         </Row>
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={1} />
//                       <Table.Summary.Cell index={3}>
//                         <strong>{totalQty}</strong>
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={4} align="right">
//                         <strong>₹{totalRate.toLocaleString("en-IN")}</strong>
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={5} align="right">
//                         <strong>
//                           ₹{totalTaxableValue.toLocaleString("en-IN")}
//                         </strong>
//                       </Table.Summary.Cell>
//                       {/* SGST */}
//                       <Table.Summary.Cell index={6} align="center">
//                         <strong>18%</strong> {/* Static SGST Percentage */}
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={7} align="right">
//                         <strong>
//                           ₹{totalSGSTAmount.toLocaleString("en-IN")}
//                         </strong>
//                       </Table.Summary.Cell>
//                       {/* CGST */}
//                       <Table.Summary.Cell index={8} align="center">
//                         <strong>18%</strong> {/* Static CGST Percentage */}
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={9} align="right">
//                         <strong>
//                           ₹{totalCGSTAmount.toLocaleString("en-IN")}
//                         </strong>
//                       </Table.Summary.Cell>
//                       <Table.Summary.Cell index={10} align="right">
//                         <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
//                       </Table.Summary.Cell>
//                     </Table.Summary.Row>
//                   </>
//                 );
//               }}
//             />
//           </ConfigProvider>

//           <Row gutter={2}>
//             <Col span={14}>
//               <Row gutter={2} justify={"start"} style={{ marginTop: 2 }}>
//                 <Col span={24}>
//                   <ConfigProvider
//                     theme={{
//                       components: {
//                         Card: {
//                           colorBorderSecondary: "#057cbd",
//                         },
//                       },
//                     }}
//                   >
//                     <Card
//                       className="invoice-card"
//                       title={"Amount in Words"}
//                       style={{ height: "85px" }}
//                     >
//                       <Text>
//                         <strong>Bill Value:</strong>
//                         <span style={{ fontSize: "12px" }}>
//                           {" "}
//                           {integerInWords.toUpperCase()} ONLY
//                         </span>
//                       </Text>
//                       <br />
//                       <Text>
//                         <strong>Tax Value:</strong>{" "}
//                         <span style={{ fontSize: "12px" }}>
//                           {" "}
//                           {integerInWords.toUpperCase()} ONLY
//                         </span>
//                       </Text>
//                     </Card>
//                   </ConfigProvider>
//                 </Col>
//               </Row>

//               {/* Payment Details */}
//               <Row gutter={16} style={{ marginTop: 4 }}>
//                 <Col span={24}>
//                   <ConfigProvider
//                     theme={{
//                       components: {
//                         Card: {
//                           colorBorderSecondary: "#057cbd",
//                         },
//                       },
//                     }}
//                   >
//                     <Card
//                       className="invoice-card"
//                       title={"Bank Details"}
//                       style={{ height: "150px" }}
//                     >
//                       <Row style={{ lineHeight: "10px", marginRight: "5px" }}>
//                         <Col span={19}>
//                           <Text>
//                             <strong>Name:</strong> ESAF Small Finance bank
//                           </Text>
//                           <br />

//                           <Text>
//                             <strong>A/C No.:</strong> 018601000033344
//                           </Text>
//                           <br />
//                           <Text>
//                             <strong>IFSC Code:</strong> IOBA0000186
//                           </Text>
//                           <br />
//                           <Text>
//                             <strong>Branch:</strong> Thondamuthur
//                           </Text>
//                           <br />
//                           <Text>
//                             <strong>UPI ID:</strong> vinayvicky-027-4@okicici
//                           </Text>
//                         </Col>

//                         <Col span={4}>
//                           <img
//                             style={{
//                               height: "88px",
//                               marginTop: "12px",
//                               width: "88px",
//                             }}
//                             src={`${process.env.PUBLIC_URL}/UPI-QR.png`}
//                           />
//                           <br />
//                           <Text
//                             style={{
//                               fontSize: "10px",
//                               fontWeight: "700",
//                               textAlign: "center",
//                             }}
//                           >
//                             Pay using UPI
//                           </Text>
//                         </Col>
//                       </Row>
//                     </Card>
//                   </ConfigProvider>
//                 </Col>
//               </Row>
//             </Col>
//             <Col span={10} style={{ marginTop: 2 }}>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card className="invoice-tatal-card">
//                   <Row
//                     style={{ borderBottom: "1px solid #057cbd" }}
//                     justify={"space-between"}
//                   >
//                     <Col style={{ paddingLeft: "5px" }}>
//                       <Text>
//                         <strong>Total Taxable Value:</strong>
//                       </Text>
//                     </Col>
//                     <Col style={{ paddingRight: "5px" }}>
//                       <Text>
//                         <strong>₹2,14,760.00</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                   <Row
//                     style={{ borderBottom: "1px solid #057cbd" }}
//                     justify={"space-between"}
//                   >
//                     <Col>
//                       <Text style={{ paddingLeft: "5px" }}>
//                         <strong>SGST:</strong>
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Text style={{ paddingRight: "5px" }}>
//                         <strong>₹2,14,760.00</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                   <Row
//                     style={{ borderBottom: "1px solid #057cbd" }}
//                     justify={"space-between"}
//                   >
//                     <Col>
//                       <Text style={{ paddingLeft: "5px" }}>
//                         <strong>CGST:</strong>
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Text style={{ paddingRight: "5px" }}>
//                         <strong>₹2,14,760.00</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                   <Row
//                     style={{ borderBottom: "1px solid #057cbd" }}
//                     justify={"space-between"}
//                   >
//                     <Col>
//                       <Text style={{ paddingLeft: "5px" }}>
//                         <strong>Round Off(+/-):</strong>
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Text style={{ paddingRight: "5px" }}>
//                         <strong>₹2,14,760.00</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                   <Row justify={"space-between"}>
//                     <Col>
//                       <Text style={{ paddingLeft: "5px" }}>
//                         <strong>Total Amount After Tax:</strong>
//                       </Text>
//                     </Col>
//                     <Col>
//                       <Text style={{ paddingRight: "5px" }}>
//                         <strong>₹2,14,760.00</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                   <Row
//                     style={{ borderTop: "1px solid #057cbd" }}
//                     justify={"end"}
//                   >
//                     <Col>
//                       <Text style={{ paddingRight: "5px" }}>
//                         <strong>E.&O.E</strong>
//                       </Text>
//                     </Col>
//                   </Row>
//                 </Card>
//               </ConfigProvider>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card
//                   className="terms-and-condition invoice-card"
//                   style={{ marginTop: 4 }}
//                   title="Terms and Conditions"
//                 >
//                   <Row style={{ lineHeight: "10px", height: "51px" }}>
//                     <Col span={24}>
//                       <Text
//                         style={{
//                           fontSize: "11px",
//                           lineHeight: "5px !important",
//                         }}
//                       >
//                         1. Goods warrenty as per T&C of the manufacturer.
//                       </Text>
//                       <br />
//                       <Text style={{ fontSize: "11px" }}>
//                         2. Goods once sold will not be taken back or exchanged.
//                       </Text>
//                       <br />
//                       <Text style={{ fontSize: "11px" }}>
//                         3. All Disputes are subject to Coimbatore Jurisdiction.
//                       </Text>
//                     </Col>
//                   </Row>
//                 </Card>
//               </ConfigProvider>
//             </Col>
//           </Row>

//           <Row gutter={2}>
//             <Col span={12}>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card
//                   className="invoice-card"
//                   style={{ marginTop: 4, height: "102px" }}
//                 >
//                   <Col
//                     span={24}
//                     style={{
//                       textAlign: "center",
//                       lineHeight: "13px",
//                       marginTop: "0px",
//                     }}
//                   >
//                     <Text style={{ fontSize: "11px" }}>
//                       I have read the warrenty and terms and conditions and
//                       received the goods in good condition.{" "}
//                     </Text>
//                     <br />
//                     <br />
//                     <br />
//                     <br />
//                     <Text
//                       alignSelf={"center"}
//                       style={{
//                         fontSize: "11px",
//                         fontSize: "12px",
//                         fontWeight: "500",
//                       }}
//                     >
//                       Customer's Signature
//                     </Text>
//                   </Col>
//                 </Card>
//               </ConfigProvider>
//             </Col>
//             <Col span={12}>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Card: {
//                       colorBorderSecondary: "#057cbd",
//                     },
//                   },
//                 }}
//               >
//                 <Card className="invoice-card" style={{ marginTop: 4 }}>
//                   <Col span={24}>
//                     <Row>
//                       <Col span={24} style={{ textAlign: "center" }}>
//                         <Text className="" style={{ fontSize: "11px" }}>
//                           Certified that the particulars given above are true
//                           and correct.
//                         </Text>
//                         <br />

//                         <Text
//                           alignSelf={"center"}
//                           style={{
//                             fontSize: "11px",
//                             fontSize: "15px",
//                             fontWeight: "700",
//                           }}
//                         >
//                           For Sri Murugan Mobiles
//                         </Text>

//                         <br />
//                         <br />
//                         <Text style={{ fontSize: "12px", fontWeight: "500" }}>
//                           Authorised Signaure
//                         </Text>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Card>
//               </ConfigProvider>
//             </Col>
//           </Row>
//           {/* </Footer> */}
//           <Row>
//             <Col span={24} style={{ textAlign: "center" }}>
//               <Text
//                 style={{ fontSize: "12px", fontWeight: "600", margin: "0px" }}
//               >
//                 This is a Computer Generated Invoice
//               </Text>
//               {/* <Text style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "600", textAlign: "center" }}>Thank you for visiting! We look forward to seeing you again!</Text> */}
//             </Col>
//           </Row>
//         </Card>
//       </div>
//       <button onClick={handlePrint}>Print</button>
//       <button onClick={generatePDF}>Download</button>
//     </>
//   );
// };

// export default InvoicePdf;

import React, { useRef, useState } from "react";
import "./invoice.css";
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
import { IndianDateTimeFormate } from "../../../service/defaultServices/formates";
const { Title, Text } = Typography;
const numberToWords = require("number-to-words");

const amount = 19999;
const desiredTableSize = 25;
const integerPart = Math.floor(amount); // Get the integer part

// Convert integer part to words
const integerInWords = numberToWords.toWords(integerPart);

// Convert decimal part to words (optional, if you need it)
// const decimalInWords = numberToWords.toWords(decimalPart);

const InvoicePdf = (props) => {
  const { pdfData } = props;
  const componentRef = useRef();
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
    const style = `
            @media print {
                @page {
                    size: A4;
                    margin: 5mm;
                }
                body {
                    margin: 0;
                    padding: 0;
                }
                .no-print {
                    display: none;
                }
               
            }
        `;

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
      // render: (_, record, index) => (record.productName ? index + 1 : " "),
    },
    {
      title: "Descriptions of Goods",
      dataIndex: "productName",
      key: "productName",
      align: "center",
    },
    {
      title: "HSN",
      dataIndex: "hsn",
      key: "hsn",
      align: "center",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      align: "center",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      align: "center",
      render: (text) => (text ? `₹${text.toLocaleString()}` : ""),
    },
    {
      title: "Taxable Value",
      dataIndex: "taxableValue",
      key: "taxableValue",
      align: "center",
      render: (text) => (text ? `₹${text.toLocaleString()}` : " "),
    },
    {
      title: "SGST",
      children: [
        {
          title: "%",
          dataIndex: "sgst",
          key: "sgst",
        },
        {
          title: "Amount",
          dataIndex: "street",
          key: "street",
        },
      ],
    },
    {
      title: "CGST",
      children: [
        {
          title: "%",
          dataIndex: "street",
          key: "street",
        },
        {
          title: "Amount",
          dataIndex: "street",
          key: "street",
        },
      ],
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
    <>
      <div
        style={{
          background: "#f5f5f5",
          margin: "0px",
          fontSize: "10px",
          minHeight: "1200px",
        }}
        id="pdf-content"
      >
        <Card
          className="invoice-card-container"
          ref={printRef}
          style={{
            width: "798px",
            height: "1123px",
            padding: "15px",
            border: "none",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <img
                src={`${process.env.PUBLIC_URL}/client-logo.png`}
                alt="Shop Logo"
                style={{ height: 85 }}
              />
            </Col>
            <Col>
              <Title level={3} style={{ margin: "0px", color: "#057cbd" }}>
                Sri Murugan Mobiles
              </Title>
              <Text>
                G/456, Basant Lok Comm, Vasant Vihar,
                <br />
                Tardeo Road,Maharashtra - 400001
                <br />
                Ph: 111 2222 3333
              </Text>
            </Col>
            <Col textAlign={"end"}>
              <img
                src={`${process.env.PUBLIC_URL}/brand-logo.png`}
                alt="Brand Logo"
                style={{ height: 80 }}
              />
            </Col>
          </Row>
          <hr style={{ height: "2px", backgroundColor: "black" }} />

          {/* <Divider style={{ padding: '1px', fontSize: "15px", margin: "0px" }}>
                        <Text >
                            Get All Your Desired Smart Phones From Apple To Vivo On Huge
                            Discounts And Easy EMI
                        </Text>
                    </Divider> */}
          {/* <hr style={{ height: '1px', backgroundColor: 'black', }} /> */}
          <Row justify="space-between" style={{ padding: "2px" }}>
            <Col>
              <Text>
                <strong>GSTIN:</strong> 26CORPP3939N1ZA
              </Text>
            </Col>
            <Col>
              <Text strong>TAX INVOICE</Text>
            </Col>
            <Col>
              <Text strong>ORIGINAL FOR RECIPIENT</Text>
            </Col>
          </Row>

          <hr style={{ height: "1px", backgroundColor: "#057cbd" }} />

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
                  {/* <Title level={7}>Customer Detail</Title> */}
                  <Col justify={"space-between"}>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <strong>Name:</strong> {pdfData?.customer?.name}
                        </Text>
                      </Col>
                      <Col span={24}>
                        <Text>
                          <strong>Address:</strong> {pdfData?.customer?.address}
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Text>
                          <strong>State:</strong> {pdfData?.customer?.state}
                        </Text>
                      </Col>
                      {pdfData.customer.email && (
                        <Col span={24}>
                          <Text>
                            <strong>Email:</strong> {pdfData?.customer?.email}
                          </Text>
                        </Col>
                      )}
                      <Col span={12}>
                        <Text>
                          <strong>Pin code:</strong>{" "}
                          {pdfData?.customer?.pinCode}
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Text>
                          <strong>Phone:</strong>{" "}
                          {pdfData?.customer?.phoneNumber}
                        </Text>
                      </Col>
                      {pdfData.customer.gstin && (
                        <Col span={12}>
                          <Text>
                            <strong>GSTIN:</strong> {pdfData?.customer?.gstin}
                          </Text>
                        </Col>
                      )}
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
                    <Col span={24}>
                      <Text>
                        <strong>Invoice No:</strong> {pdfData?.invoiceNumber}
                      </Text>
                    </Col>
                    <Col span={24}>
                      <Text>
                        <strong>Invoice Date:</strong>{" "}
                        {IndianDateTimeFormate(pdfData?.invoiceDate)}
                      </Text>
                    </Col>
                    {/* {pdfData.emiDetails && ( */}
                    <>
                      <Col span={24}>
                        <Text>
                          <strong>Finance:</strong>{" "}
                          {pdfData?.emiDetails?.financeProvider}
                        </Text>
                      </Col>
                      <Col span={24}>
                        <Text>
                          <strong>D.O/D.A Number:</strong>{" "}
                          {pdfData?.emiDetails?.dadoNumber}
                        </Text>
                      </Col>
                    </>
                    {/* )} */}
                    {/* {pdfData.creditReminder && ( */}
                    <Col span={24}>
                      <Text>
                        <strong>Credit:</strong> ₹{" "}
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
                  // borderColor: "#057cbd",
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
                      <Table.Summary.Cell index={3}>
                        <strong>{totalQty}</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4} align="right">
                        <strong>₹{totalRate.toLocaleString("en-IN")}</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5} align="right">
                        <strong>
                          ₹{totalTaxableValue.toLocaleString("en-IN")}
                        </strong>
                      </Table.Summary.Cell>
                      {/* SGST */}
                      <Table.Summary.Cell index={6} align="center">
                        <strong>18%</strong> {/* Static SGST Percentage */}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7} align="right">
                        <strong>
                          ₹{totalSGSTAmount.toLocaleString("en-IN")}
                        </strong>
                      </Table.Summary.Cell>
                      {/* CGST */}
                      <Table.Summary.Cell index={8} align="center">
                        <strong>18%</strong> {/* Static CGST Percentage */}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={9} align="right">
                        <strong>
                          ₹{totalCGSTAmount.toLocaleString("en-IN")}
                        </strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={10} align="right">
                        <strong>₹{grandTotal.toLocaleString("en-IN")}</strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </ConfigProvider>

          <Row gutter={2}>
            <Col span={14}>
              <Row gutter={2} justify={"start"} style={{ marginTop: 2 }}>
                <Col span={24}>
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
                      title={"Amount in Words"}
                      style={{ height: "85px" }}
                    >
                      <Text>
                        <strong>Bill Value:</strong>
                        <span style={{ fontSize: "12px" }}>
                          {" "}
                          {integerInWords.toUpperCase()} ONLY
                        </span>
                      </Text>
                      <br />
                      <Text>
                        <strong>Tax Value:</strong>{" "}
                        <span style={{ fontSize: "12px" }}>
                          {" "}
                          {integerInWords.toUpperCase()} ONLY
                        </span>
                      </Text>
                    </Card>
                  </ConfigProvider>
                </Col>
              </Row>

              {/* Payment Details */}
              <Row gutter={16} style={{ marginTop: 4 }}>
                <Col span={24}>
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
                      title={"Bank Details"}
                      style={{ height: "150px" }}
                    >
                      <Row style={{ lineHeight: "10px", marginRight: "5px" }}>
                        <Col span={19}>
                          <Text>
                            <strong>Name:</strong> ESAF Small Finance bank
                          </Text>
                          <br />

                          <Text>
                            <strong>A/C No.:</strong> 018601000033344
                          </Text>
                          <br />
                          <Text>
                            <strong>IFSC Code:</strong> IOBA0000186
                          </Text>
                          <br />
                          <Text>
                            <strong>Branch:</strong> Thondamuthur
                          </Text>
                          <br />
                          <Text>
                            <strong>UPI ID:</strong> vinayvicky-027-4@okicici
                          </Text>
                        </Col>

                        <Col span={4}>
                          <img
                            style={{
                              height: "88px",
                              marginTop: "12px",
                              width: "88px",
                            }}
                            src={`${process.env.PUBLIC_URL}/UPI-QR.png`}
                          />
                          <br />
                          <Text
                            style={{
                              fontSize: "10px",
                              fontWeight: "700",
                              textAlign: "center",
                            }}
                          >
                            Pay using UPI
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </ConfigProvider>
                </Col>
              </Row>
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
                <Card className="invoice-tatal-card">
                  <Row
                    style={{ borderBottom: "1px solid #057cbd" }}
                    justify={"space-between"}
                  >
                    <Col style={{ paddingLeft: "5px" }}>
                      <Text>
                        <strong>Total Taxable Value:</strong>
                      </Text>
                    </Col>
                    <Col style={{ paddingRight: "5px" }}>
                      <Text>
                        <strong>₹2,14,760.00</strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={{ borderBottom: "1px solid #057cbd" }}
                    justify={"space-between"}
                  >
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>SGST:</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>₹2,14,760.00</strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={{ borderBottom: "1px solid #057cbd" }}
                    justify={"space-between"}
                  >
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>CGST:</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>₹2,14,760.00</strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={{ borderBottom: "1px solid #057cbd" }}
                    justify={"space-between"}
                  >
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>Round Off(+/-):</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>₹2,14,760.00</strong>
                      </Text>
                    </Col>
                  </Row>
                  <Row justify={"space-between"}>
                    <Col>
                      <Text style={{ paddingLeft: "5px" }}>
                        <strong>Total Amount After Tax:</strong>
                      </Text>
                    </Col>
                    <Col>
                      <Text style={{ paddingRight: "5px" }}>
                        <strong>₹2,14,760.00</strong>
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
                  style={{ marginTop: 4 }}
                  title="Terms and Conditions"
                >
                  <Row style={{ lineHeight: "10px", height: "51px" }}>
                    <Col span={24}>
                      <Text
                        style={{
                          fontSize: "11px",
                          lineHeight: "5px !important",
                        }}
                      >
                        1. Goods warrenty as per T&C of the manufacturer.
                      </Text>
                      <br />
                      <Text style={{ fontSize: "11px" }}>
                        2. Goods once sold will not be taken back or exchanged.
                      </Text>
                      <br />
                      <Text style={{ fontSize: "11px" }}>
                        3. All Disputes are subject to Coimbatore Jurisdiction.
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </ConfigProvider>
            </Col>
          </Row>

          <Row gutter={2}>
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
                  style={{ marginTop: 4, height: "102px" }}
                >
                  <Col
                    span={24}
                    style={{
                      textAlign: "center",
                      lineHeight: "13px",
                      marginTop: "0px",
                    }}
                  >
                    <Text style={{ fontSize: "11px" }}>
                      I have read the warrenty and terms and conditions and
                      received the goods in good condition.{" "}
                    </Text>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Text
                      alignSelf={"center"}
                      style={{
                        fontSize: "11px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Customer's Signature
                    </Text>
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
                <Card className="invoice-card" style={{ marginTop: 4 }}>
                  <Col span={24}>
                    <Row>
                      <Col span={24} style={{ textAlign: "center" }}>
                        <Text className="" style={{ fontSize: "11px" }}>
                          Certified that the particulars given above are true
                          and correct.
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
          {/* </Footer> */}
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Text
                style={{ fontSize: "12px", fontWeight: "600", margin: "0px" }}
              >
                This is a Computer Generated Invoice
              </Text>
              {/* <Text style={{ fontSize: "14px", fontFamily: "sans-serif", fontWeight: "600", textAlign: "center" }}>Thank you for visiting! We look forward to seeing you again!</Text> */}
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
    </>
  );
};

export default InvoicePdf;
