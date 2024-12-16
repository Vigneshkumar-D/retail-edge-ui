import { Col, DatePicker, Form, Row } from "antd";
import { EndDateLimitDisabled } from "../service/defaultServices/formates";
import { Component } from "react";

class DateRangePicker extends Component {
  state = {
    startDate: null, // Store selected start date
  };

  // Handler for selecting start date
  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  render() {
    const { startDate } = this.state;

    return (
      <Row gutter={[10,10]}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            name="startDate"
            label=""
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker placeholder="Start Date" onChange={this.handleStartDateChange} style={{width:"100%"}}/>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            name="endDate"
            label=""
            rules={[{ required: true, message: "Please select a date" }]}
          >
            {/* Use the DisabledEndDate function, passing the selected startDate */}
            <DatePicker placeholder="End Date" disabledDate={EndDateLimitDisabled(startDate)} style={{width:"100%"}}/>
          </Form.Item>
        </Col>
      </Row>
    );
  }
}

export default DateRangePicker;
