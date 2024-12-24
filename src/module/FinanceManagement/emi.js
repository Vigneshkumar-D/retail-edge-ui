import TableParentPage from "../../component/tableParentPage";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Table,
} from "antd";
import Delete from "../../component/deleteButton";
import Edit from "../../component/editButton";
import EmiService from "../../service/customizeServices/FinanceManagement/emi";
import TextArea from "antd/es/input/TextArea";
import View from "../../component/viewButton";
import { FaList } from "react-icons/fa";

class EMI extends TableParentPage {
  service = new EmiService();
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
  handleProductModule = (id) => {
    const order = this.state.data.find((order) => order.id === id); // Find the order by id

    this.setState({
      formOpenProductList: true,
      productData: order.product,
    });
  };
  columns = [
    {
      title: "Name",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e.name || "-",
    },
    {
      title: "Phone Number",
      dataIndex: "customer",
      key: "customer",
      render: (e) => e.phoneNumber || "-",
    },
    {
      title: "EMI Amount",
      dataIndex: "emiAmount",
      key: "emiAmount",
      render: (e) => `Rs. ${e}`,
    },
    {
      title: "Products",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (e) => (
        <Button
          className="editDeleteButton"
          style={{ border: "none", color: "green", background: "tranparent" }}
          onClick={() => {
            this.handleProductModule(e);
          }}
        >
          <FaList />
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align:"center",
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
  productColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (e) => e || "-",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (e) => e.category || "-",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (e) => e || "-",
    },

    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (e) => e || "-",
    },
    // {
    //   title: "Price",
    //   dataIndex: "price",
    //   key: "price",
    //   render: (e) => `₹${e.toLocaleString()}` || "-",
    // },
  ];

  handleCancelProductList = () => {
    this.setState({ formOpenProductList: false });
  };

  render() {
    return (
      <>
        <h2>EMI</h2>
        <br />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#bdbdd7",
              },
            },
          }}
        >
          <Table
            dataSource={this.state.data}
            columns={this.columns}
            scroll={{
              x: "max-content",
            }}
          />
        </ConfigProvider>
        <Modal
          title="EMI"
          open={this.state.formOpen}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            ref={this.formRef} // Attach form reference
            name="form_item_path"
            layout="vertical"
            onFinish={this.save}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="customerId"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the Name`,
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the Phone Number`,
                    },
                  ]}
                >
                  <Input readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="totalAmount"
                  label="Total Amount"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the totla amount`,
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="emiAmount"
                  label="EMI Amount"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the EMI amount`,
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="initialAmount"
                  label="Upfront Amount"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the initial amount`,
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="numberOfInstallments"
                  label="Number of EMIs"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the number of installments`,
                    },
                  ]}
                >
                  <Input type="Number" readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="startDate"
                  label="Start Date"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the start date`,
                    },
                  ]}
                >
                  <DatePicker readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="endDate"
                  label="End Date"
                  width={24}
                  rules={[
                    {
                      required: true,
                      message: `Please enter the end date`,
                    },
                  ]}
                >
                  <DatePicker readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: `Please enter the description`,
                    },
                  ]}
                >
                  <TextArea readOnly={this.state.mode === "view"} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          title={"Products"}
          open={this.state.formOpenProductList}
          onCancel={this.handleCancelProductList}
          footer={false}
          width={800}
        >
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#7CB9E8",
                },
              },
            }}
          >
            <Table
              columns={this.productColumns}
              dataSource={this.state.productData}
              scroll={{
                x: "max-content",
              }}
            />
          </ConfigProvider>
        </Modal>
      </>
    );
  }
}

export default EMI;
