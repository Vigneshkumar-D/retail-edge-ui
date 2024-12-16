import { FormOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Component } from "react";

class Edit extends Component {
  render() {
    return (
      <Tooltip title="Edit">
        <Button
          icon={<FormOutlined  style={{color:"orange"}}/>}
          className="editDeleteButton"
          onClick={this.props.onClickFn}
        />
      </Tooltip>
    );
  }
}

export default Edit;
