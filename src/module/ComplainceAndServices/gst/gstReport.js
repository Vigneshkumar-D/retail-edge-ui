import { Button, Col, Form, Row } from "antd";
import DateRangePicker from "../../../component/dateRangePicker";
import { UTCFormate } from "../../../service/defaultServices/formates";

const GSTReport = () => {
  const getReport = (val) => {
    console.log("state date : ", UTCFormate(val.startDate));
    console.log("end date : ", UTCFormate(val.endDate));
  };
  return (
    <Form onFinish={getReport}>
      <Row gutter={[20,20]}>
        <Col sm={24} md={16} lg={12}>
          <DateRangePicker />
        </Col>
        <Col md={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default GSTReport;
