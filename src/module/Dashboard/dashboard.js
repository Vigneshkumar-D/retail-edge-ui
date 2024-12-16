import { Card, Col, Progress, Row, Table, Tag } from "antd";
import { JavaOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { CgArrowTopRight } from "react-icons/cg";
import DynamicChart from "../../graphs/lineGraph";
import GradientDonutChart from "../../graphs/gradiantPie";
import BarChart from "../../graphs/barchart";
const { Title } = Typography;

const Dashboard = () => {
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Tag style={{ backgroundColor: "white" }}>
                      <JavaOutlined />
                    </Tag>
                    Total Users
                  </Col>
                  <Col span={12}>
                    <JavaOutlined style={{ fontSize: "5rem" }} />
                  </Col>
                  <Col span={12}>
                    <Title level={2}>89,935</Title>
                    <div>
                      <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
                      this week
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Tag style={{ backgroundColor: "white" }}>
                      <JavaOutlined />
                    </Tag>
                    Total Products
                  </Col>
                  <Col span={12}>
                    <JavaOutlined style={{ fontSize: "5rem" }} />
                  </Col>
                  <Col span={12}>
                    <Title level={2}>23,283</Title>
                    <div>
                      <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
                      this week
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Tag style={{ backgroundColor: "white" }}>
                      <JavaOutlined />
                    </Tag>
                    Total Sales
                  </Col>
                  <Col span={12}>
                    <JavaOutlined style={{ fontSize: "5rem" }} />
                  </Col>
                  <Col span={12}>
                    <Title level={2}>46,827</Title>
                    <div>
                      <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
                      this week
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Tag style={{ backgroundColor: "white" }}>
                      <JavaOutlined />
                    </Tag>
                    Total Refunded
                  </Col>
                  <Col span={12}>
                    <JavaOutlined style={{ fontSize: "5rem" }} />
                  </Col>
                  <Col span={12}>
                    <Title level={2}>89,935</Title>
                    <div>
                      <CgArrowTopRight style={{ color: "goldenrod" }} /> 1.0%
                      this week
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card>
            <h3>Total Products</h3>
            <Table
              dataSource={[
                {
                  sno: "1",
                  productName: "IPhone 1",
                  popularity: 95,
                },
                {
                  sno: "2",
                  productName: "IPhone 2",
                  popularity: 85,
                },
                {
                  sno: "3",
                  productName: "IPhone 3",
                  popularity: 75,
                },
                {
                  sno: "4",
                  productName: "IPhone 4",
                  popularity: 65,
                },
                {
                  sno: "5",
                  productName: "IPhone 5",
                  popularity: 55,
                },
              ]}
              columns={[
                {
                  title: "S.No",
                  dataIndex: "sno",
                  key: "sno",
                },
                {
                  title: "Product Name",
                  dataIndex: "productName",
                  key: "productName",
                },
                {
                  title: "Popularity",
                  dataIndex: "popularity",
                  key: "popularity",
                  render: (e) => {
                    return <Progress percent={e} type="line" />;
                  },
                },
                {
                  title: "Sales",
                  dataIndex: "popularity",
                  key: "popularity",
                  render: (e) => {
                    return <Tag>{e}</Tag>;
                  },
                },
              ]}
              style={{ height: "239px", overflowY: "scroll" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <DynamicChart height="229" title={"Orders Analytics"} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <GradientDonutChart title={"Earnings"} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h3>Market Growth</h3>
            <BarChart/>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
