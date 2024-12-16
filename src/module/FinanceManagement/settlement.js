import TableParentPage from "../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import RoleService from "../../service/customizeServices/UserManagements/roleService";
import { UserAddOutlined } from "@ant-design/icons";
import { DateTimeFormat } from "../../service/defaultServices/formates";
import View from "../../component/viewButton";
import { Link } from "react-router-dom";
import "../../App.css";

class Settlement extends TableParentPage {
  service = new RoleService();
  constructor(props) {
    super(props);
    this.state = {
      // common datas
      data: [],
      formOpen: false,
      mode: null,
      id: null,

      // specific datas
    };
  }
  columns = [
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (e) => (e ? "Active" : "Inactive"),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
      render: (e) => DateTimeFormat(e) || "-",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "150px",
      render: (e) => {
        return (
          <>
            <Delete id={e} deleteItem={() => this.delete(e)} />
            <Edit
              onClickFn={() => {
                this.editForm(e);
              }}
            />
            <View onClickFn={() => this.viewForm(e)} />
          </>
        );
      },
      fixed: "right",
    },
  ];
  render() {
    return (
      <>
        <div className="skills-main-container">
          <img
            src={`${process.env.PUBLIC_URL}/construction.jpg`}
            className="under-const-image"
            alt="under-construction-pic"
          />
          <h1 className="under-const-title">This page is under construction</h1>
          <Link to="/">
            <Button className="back-to-home-btn" type="primary">
              Back to Home
            </Button>
          </Link>
        </div>
      </>
    );
  }
}

export default Settlement;
