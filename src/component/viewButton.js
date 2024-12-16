import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Component } from "react";

class View extends Component {
  render() {
    return (
      <Tooltip title="Details">
        <Button
          icon={<FolderOpenOutlined  style={{color:"orange"}}/>}
          className="editDeleteButton"
          onClick={this.props.onClickFn}
        />
      </Tooltip>
    );
  }
}

export default View;
