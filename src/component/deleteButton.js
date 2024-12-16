import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { Component } from "react";
const { confirm } = Modal;

class Delete extends Component {
  showConfirm = () => {
    confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        this.props.deleteItem();
      },
      onCancel() {
      },
    });
  };
  render() {
    return (
      <Tooltip title="Delete">
        <Button
          icon={<DeleteOutlined style={{color:"red"}} />}
          className="editDeleteButton"
          onClick={this.showConfirm}
        />
      </Tooltip>
    );
  }
}

export default Delete;
