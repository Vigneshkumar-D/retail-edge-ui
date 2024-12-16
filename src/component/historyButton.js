import { FieldTimeOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Component } from "react";

class History extends Component {
  render() {
    return (
      <Tooltip title="Payments">
        <Button
          icon={<FieldTimeOutlined  style={{color:"green"}}/>}
          className="editDeleteButton"
          onClick={this.props.onClickFn}
        />
      </Tooltip>
    );
  }
}

export default History;
