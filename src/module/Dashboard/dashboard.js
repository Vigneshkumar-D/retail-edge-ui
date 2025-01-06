import { Col, Flex, Row, Select, Tag } from "antd";
import { JavaOutlined } from "@ant-design/icons";
import LinearChart from "../../graphs/linearChart";
import InvoiceHistoryForDashBoard from "../SalesAndBilling/Invoice/invoiceHistoryForDashBoard";
import GradientDonutChart from "../../graphs/gradiantPie";

const Dashboard = () => {
  const cardData = [
    { title: "Total Sales", value: "₹ 25,000", image: "totalsale.png" },
    { title: "Stock Value", value: "₹ 25,000", image: "stockvalue.png" },
    { title: "Outstanding Credits", value: "₹ 25,000", image: "credits.png" },
    { title: "Paid Service", value: "₹ 25,000", image: "paidservice.png" },
    { title: "Supplier Payments", value: "₹ 25,000", image: "supplier.png" },
    { title: "Expense", value: "₹ 25,000", image: "expencemanager.png" },
  ];
  return (
    <>
      <Select
        options={[
          { value: "year", label: "This year" },
          { value: "month", label: "This month" },
          { value: "week", label: "This week" },
          { value: "today", label: "Today" },
        ]}
        defaultValue="today"
      />
      <br/>
      <br/>
      <Row gutter={[10, 10]}>
        <Col span={15}>
          <Row gutter={[10, 10]}>
            {cardData.map((item, index) => (
              <Col key={index} span={8}>
                <Tag className="dashboard-tag-style">
                  <Flex justify="space-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h4>{item.title}</h4>
                      <h3>{item.value}</h3>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/${item.image}`}
                      alt={item.title}
                      style={{
                        width: "45%",
                        height: "auto",
                      }}
                    />
                  </Flex>
                </Tag>
              </Col>
            ))}
            <Col span={24}>
              <Tag style={{ paddingTop: "15px", width: "100%" }}>
                <LinearChart height={200} type="area" />
              </Tag>
            </Col>
            <Col span={24}>
              <Tag className="dashboard-tag-style">
                <InvoiceHistoryForDashBoard />
              </Tag>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Tag className="dashboard-tag-style">
                <Flex>
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile Picture"
                    style={{
                      width: "23%",
                      height: "auto",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      paddingLeft: "14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h1>Welcome</h1>
                    <h2 style={{ fontWeight: "500" }}>Administrator</h2>
                  </div>
                </Flex>
              </Tag>
            </Col>
            <Col span={24}>
              <Tag style={{ paddingTop: "15px", width: "100%" }}>
                <LinearChart dataLabels={false} type="bar" height={160} />
              </Tag>
            </Col>
            <Col span={24}>
              <Tag style={{ paddingTop: "15px", width: "100%" }}>
                {/* <LinearChart dataLabels={false} height={160} type="line"/> */}
                <LinearChart dataLabels={false} type="line" height={160} />
              </Tag>
            </Col>
            <Col span={24}>
              <Tag style={{ paddingTop: "15px", width: "100%" }}>
                <GradientDonutChart title="LinearChart" width={150} />
              </Tag>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
