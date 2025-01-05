// import { Card, Col, Progress, Row, Table, Tag } from "antd";
// import { JavaOutlined } from "@ant-design/icons";
// import { Typography } from "antd";
// import { CgArrowTopRight } from "react-icons/cg";
// import DynamicChart from "../../graphs/lineGraph";
// import GradientDonutChart from "../../graphs/gradiantPie";
// import BarChart from "../../graphs/barchart";
// const { Title } = Typography;

// const Dashboard = () => {
//   return (
//     <>
//       <Row gutter={[10, 10]}>
//         <Col span={12}>
//           <Row gutter={[10, 10]}>
//             <Col span={12}>
//               <Card>
//                 <Row>
//                   <Col span={24}>
//                     <Tag style={{ backgroundColor: "white" }}>
//                       <JavaOutlined />
//                     </Tag>
//                     Total Users
//                   </Col>
//                   <Col span={12}>
//                     <JavaOutlined style={{ fontSize: "5rem" }} />
//                   </Col>
//                   <Col span={12}>
//                     <Title level={2}>89,935</Title>
//                     <div>
//                       <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
//                       this week
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card>
//                 <Row>
//                   <Col span={24}>
//                     <Tag style={{ backgroundColor: "white" }}>
//                       <JavaOutlined />
//                     </Tag>
//                     Total Products
//                   </Col>
//                   <Col span={12}>
//                     <JavaOutlined style={{ fontSize: "5rem" }} />
//                   </Col>
//                   <Col span={12}>
//                     <Title level={2}>23,283</Title>
//                     <div>
//                       <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
//                       this week
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card>
//                 <Row>
//                   <Col span={24}>
//                     <Tag style={{ backgroundColor: "white" }}>
//                       <JavaOutlined />
//                     </Tag>
//                     Total Sales
//                   </Col>
//                   <Col span={12}>
//                     <JavaOutlined style={{ fontSize: "5rem" }} />
//                   </Col>
//                   <Col span={12}>
//                     <Title level={2}>46,827</Title>
//                     <div>
//                       <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
//                       this week
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//             <Col span={12}>
//               <Card>
//                 <Row>
//                   <Col span={24}>
//                     <Tag style={{ backgroundColor: "white" }}>
//                       <JavaOutlined />
//                     </Tag>
//                     Total Refunded
//                   </Col>
//                   <Col span={12}>
//                     <JavaOutlined style={{ fontSize: "5rem" }} />
//                   </Col>
//                   <Col span={12}>
//                     <Title level={2}>89,935</Title>
//                     <div>
//                       <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
//                       this week
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </Col>
//         <Col span={12}>
//           <Card>
//             <h3>Total Products</h3>
//             <Table
//               dataSource={[
//                 {
//                   sno: "1",
//                   productName: "IPhone 1",
//                   popularity: 95,
//                 },
//                 {
//                   sno: "2",
//                   productName: "IPhone 2",
//                   popularity: 85,
//                 },
//                 {
//                   sno: "3",
//                   productName: "IPhone 3",
//                   popularity: 75,
//                 },
//                 {
//                   sno: "4",
//                   productName: "IPhone 4",
//                   popularity: 65,
//                 },
//                 {
//                   sno: "5",
//                   productName: "IPhone 5",
//                   popularity: 55,
//                 },
//               ]}
//               columns={[
//                 {
//                   title: "S.No",
//                   dataIndex: "sno",
//                   key: "sno",
//                 },
//                 {
//                   title: "Product Name",
//                   dataIndex: "productName",
//                   key: "productName",
//                 },
//                 {
//                   title: "Popularity",
//                   dataIndex: "popularity",
//                   key: "popularity",
//                   render: (e) => {
//                     return <Progress percent={e} type="line" />;
//                   },
//                 },
//                 {
//                   title: "Sales",
//                   dataIndex: "popularity",
//                   key: "popularity",
//                   render: (e) => {
//                     return <Tag>{e}</Tag>;
//                   },
//                 },
//               ]}
//               style={{ height: "239px", overflowY: "scroll" }}
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card>
//             <DynamicChart height="229" title={"Orders Analytics"} />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card>
//             <GradientDonutChart title={"Earnings"} />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card>
//             <h3>Market Growth</h3>
//             <BarChart/>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default Dashboard;

import { Card, Col, Flex, Progress, Row, Table, Tag } from "antd";
import { JavaOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import GradientDonutChart from "../../graphs/gradiantPie";
import InvoiceHistory from "../SalesAndBilling/Invoice/invoiceHistory";
import MultiBarChart from "../../graphs/multiBarChart";
const { Title } = Typography;

const Dashboard = () => {
  return (
    <>
      <Row gutter={[5, 5]}>
        <Col span={14}>
          <Row gutter={[5, 5]}>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>Total Sales</h4>
                    <h3>₹ 25,000</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>Monthly Sales</h4>
                    <h3>₹ 25,000</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>Weekly Sales</h4>
                    <h3>₹ 25,000</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>Yesterdays Sales</h4>
                    <h3>₹ 25,000</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>Todays Sales</h4>
                    <h3>₹ 25,000</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      display: "flex",
                      flex: 2,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4>No of Bills</h4>
                    <h3>100</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <JavaOutlined style={{ fontSize: "3rem" }} />
                  </div>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Card style={{ height: "100%" }}>
            <Flex>
              <div
                style={{
                  display: "flex",
                  flex: 2,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h2>Welcome, </h2>
                <h2 style={{ fontWeight: "500" }}>Administrator</h2>
                <p>
                  One of your dependencies, babel-preset-react-app, is importing
                  the "@babel/plugin-proposal-private-property-in-object"
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile Picture"
                  style={{
                    height: "auto",
                    width: "100%",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={10}>
          <Card style={{ height: "100%" }}>
            <h3>Top moving products</h3>
            <br />
            <MultiBarChart
              seriesData = {[
                {
                  name: 'Quantity',
                  data: [44, 55, 57],
                },
                {
                  name: 'Revenue',
                  data: [76, 85, 101],
                },
              ]}
              categories={["Phone", "Tab", "Earphone"]}
              height={200}
            />
          </Card>
        </Col>
        <Col span={14}>
          <Card style={{ height: "100%" }}>
            <InvoiceHistory />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
