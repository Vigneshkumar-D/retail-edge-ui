import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import UserService from "../../../service/customizeServices/UserManagements/userService";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ProductService from "../../../service/customizeServices/InventoryManagement/product_management/productService";
import InvoiceGenerationService from "../../../service/customizeServices/SalesAndBiling/invoiceGenerationService";
import { useNavigate, useParams } from "react-router-dom";
import BillParentComponent from "../../CommonComponents/billParentComponent";

class InvoiceBillClass extends BillParentComponent {
  constructor() {
    super();
    this.state = {
      ...this.state,
      paymentType: ["CASH"],
      isLoading: false,
      salesManList: [],
      productList: [],
    };
  }
  userService = new UserService();
  productService = new ProductService();
  service = new InvoiceGenerationService();
  updateUrl = "/sales-and-billing/invoice/history";
  onChange = (v) => {
    this.setState({ paymentType: v });
  };
  formatIndianNumber = (number) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0, // Adjust if you need decimals
    });
    return formatter.format(number);
  };
  componentDidMount() {
    if (this.props.id) {
      this.setState({ mode: "update", id: this.props.id });
      super.componentDidMount();
      this.productService
        .getAll()
        .then((res) => {
          this.setState({ productList: res.data.data });
        })
        .catch((err) => message.error(err.response.data.message))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: true });

      const fetchProducts = this.productService.getAll();
      const fetchSalesmen = this.userService.getAll();

      Promise.all([fetchProducts, fetchSalesmen])
        .then(([productRes, salesManRes]) => {
          this.setState({
            productList: productRes.data.data,
            salesManList: salesManRes.data.data,
          });
        })
        .catch((err) => {
          message.error(err.response?.data?.message || "Failed to fetch data");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form
          layout="vertical"
          onFinish={this.save}
          initialValues={{
            paymentMethod: ["CASH"], // Default value for Checkbox.Group
            totalAmount: 0,
            pricePerUnit: 0,
            sgstAmount: 0,
            cgstAmount: 0,
            igstAmount: 0,
            roundOff: 0,
            totalAmount: 0,
            totalTaxAmount: 0,
            totDiscountAmount: 0,
          }}
          onValuesChange={(changedValues, allValues) => {
            const { lineItems } = allValues;
            if (!lineItems || lineItems.length === 0) return;

            const updatedLineItems = [...lineItems];

            const changedIndex = changedValues?.lineItems?.findIndex(
              (item) =>
                item &&
                ("product" in item ||
                  "quantity" in item ||
                  "discountAmount" in item)
            );

            if (changedIndex !== -1) {
              const changedItem = lineItems[changedIndex];
              const selectedProduct = this.state.productList?.find(
                (p) => p.id === changedItem?.product?.id
              );

              if (selectedProduct) {
                const pricePerUnit = selectedProduct.sellingPrice || 0;
                const quantity = changedItem.quantity || 1;
                const discountAmount = Number(changedItem.discountAmount || 0);
                const quantityPrice = quantity * pricePerUnit;
                const lineTotal = quantityPrice - discountAmount;
                const sgstAmount = parseFloat(
                  (
                    (quantityPrice *
                      (selectedProduct.hsnCode?.taxSlab?.sgst || 0)) /
                    100
                  ).toFixed(2)
                );
                const cgstAmount = parseFloat(
                  (
                    (quantityPrice *
                      (selectedProduct.hsnCode?.taxSlab?.cgst || 0)) /
                    100
                  ).toFixed(2)
                );
                const igstAmount = parseFloat(
                  (
                    (quantityPrice *
                      (selectedProduct.hsnCode?.taxSlab?.igst || 0)) /
                    100
                  ).toFixed(2)
                );

                updatedLineItems[changedIndex] = {
                  ...changedItem,
                  pricePerUnit,
                  lineTotal,
                  // hsnCode: selectedProduct?.hsnCode,
                  sgstAmount,
                  cgstAmount,
                  igstAmount,
                  totalTaxAmount: parseFloat(
                    [sgstAmount, cgstAmount, igstAmount]
                      .reduce((sum, tax) => sum + tax, 0)
                      .toFixed(2)
                  ),
                };
              }
            }

            // Calculate the total price per unit
            const pricePerUnit = parseFloat(
              updatedLineItems
                .filter((item) => item != null)
                .reduce(
                  (sum, item) =>
                    sum +
                    (() => item.pricePerUnit || 0)() *
                      (() => item.quantity || 0)(),
                  0
                )
                .toFixed(2)
            );

            // Calculate the total immediately
            const lineTotal = updatedLineItems
              .filter((item) => item != null)
              .reduce((sum, item) => sum + (() => item.lineTotal || 0)(), 0);

            // Calculate the total tax amount
            const totalTaxAmount = updatedLineItems
              .filter((item) => item != null)
              .reduce(
                (sum, item) => sum + (() => item.totalTaxAmount || 0)(),
                0
              );

            // Calculate the total igst amount
            const igstAmount = updatedLineItems
              .filter((item) => item != null)
              .reduce((sum, item) => sum + (() => item.igstAmount || 0)(), 0);

            // Calculate the total igst amount
            const cgstAmount = updatedLineItems
              .filter((item) => item != null)
              .reduce((sum, item) => sum + (() => item.cgstAmount || 0)(), 0);

            // Calculate the total igst amount
            const sgstAmount = updatedLineItems
              .filter((item) => item != null)
              .reduce((sum, item) => sum + (() => item.sgstAmount || 0)(), 0);

            // Calculate the total discount amount
            const totDiscountAmount = parseFloat(
              updatedLineItems
                .filter((item) => item != null)
                .reduce(
                  (sum, item) =>
                    sum + (() => Number(item.discountAmount) || 0)(),
                  0
                )
                .toFixed(2)
            );

            // Calculate the total amount
            const totalAmountFull = parseFloat(
              updatedLineItems
                .filter((item) => item != null)
                .reduce(
                  (sum, item) =>
                    sum +
                    (() => Number(item.totalTaxAmount) || 0)() +
                    (() => Number(item.lineTotal) || 0)(),
                  0
                )
                .toFixed(2)
            );

            const totalAmount = parseFloat(
              Math.ceil((() => totalAmountFull || 0)()).toFixed(2)
            );

            // Calculate the rount off amount
            const roundOff = parseFloat(
              (
                (() => totalAmount || 0)() - (() => totalAmountFull || 0)()
              ).toFixed(2)
            );

            // Update the form values
            this.form.setFieldsValue({
              lineItems: updatedLineItems,
              lineTotal,
              totalAmount: totalAmount,
              totalTaxAmount,
              igstAmount,
              cgstAmount,
              sgstAmount,
              totDiscountAmount,
              pricePerUnit,
              roundOff,
            });
            this.setState({
              lineTotal,
              totalTaxAmount,
              totDiscountAmount,
              totalAmount,
              pricePerUnit,
              roundOff,
            }); // Optionally store it in state if required
          }}
          ref={(formRef) => (this.form = formRef)}
          // Save form reference
        >
          <Row gutter={[10, 10]}>
            <Col xs={24} lg={16}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <h3 style={{ color: "blue", paddingLeft: "5px" }}>
                  Invoice Details
                </h3>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Row gutter={[5, 5]}>
                  <Col span={24}>
                    <Form.Item
                      name="paymentMethod"
                      label="Payment Method"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the methods",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Checkbox.Group
                        onChange={this.onChange}
                        options={[
                          { label: "Cash", value: "CASH" },
                          { label: "Credit", value: "CREDIT" },
                          { label: "UPI", value: "UPI" },
                          { label: "Finance", value: "FINANCE" },
                          { label: "Card", value: "CARD" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      // name="soldBy"
                      name={["soldBy", "id"]}
                      label="Sold by"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the sales person",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Select
                        options={this.state?.salesManList?.map((e) => ({
                          label: e.username,
                          value: e.id,
                        }))}
                        placeholder="Sold By"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="invoiceDate"
                      label="Invoice Date"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the invoice date",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  {this.state?.paymentType.includes("CREDIT") && (
                    <>
                      <Col span={24}>
                        <hr
                          style={{
                            border: "none", // Removes the default border
                            height: "2px", // Sets the line thickness
                            backgroundColor: "#f2f2f0", // Sets the line color
                            marginBottom: "5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["creditReminder", "totalCreditAmount"]}
                          label="Total Credit"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the total credit amount",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input type="Number" className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["creditReminder", "dueDate"]}
                          label="Due Date"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the due date",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <DatePicker
                            format="YYYY-MM-DD"
                            style={{ width: "100%" }}
                            className="input-tag-style"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["creditReminder", "creditType"]}
                          label="Credit Type"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the credit type",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Select
                            mode="multiple"
                            className="input-tag-style"
                            dropdownStyle={{ backgroundColor: "#f8fafc" }}
                            options={[
                              {
                                value: "MOBILE",
                                label: "MOBILE",
                              },
                              {
                                value: "ACCESSORIES",
                                label: "ACCESSORIES",
                              },
                              {
                                value: "SERVICE",
                                label: "SERVICE",
                              },
                              {
                                value: "OTHER",
                                label: "OTHER",
                              },
                              {
                                value: "EMI",
                                label: "EMI",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["creditReminder", "reminderSent"]}
                          label="Reminder Sent"
                          rules={[
                            { required: true, message: "Please check the box" },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {this.state?.paymentType.includes("UPI") && (
                    <>
                      <Col span={24}>
                        <hr
                          style={{
                            border: "none", // Removes the default border
                            height: "2px", // Sets the line thickness
                            backgroundColor: "#f2f2f0", // Sets the line color
                            marginBottom: "5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="upiId"
                          label="UPI ID"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the UPI id",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="UPI ID"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="upiTransactionID"
                          label="UPI Transaction ID"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the UPI transaction ID",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="UPI Transaction ID"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="upiApp"
                          label="UPI App"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the UPI App",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="UPI App"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="upiPayment"
                          label="UPI Payment"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the UPI payment",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="UPI payment"
                            type="Number"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {this.state?.paymentType.includes("FINANCE") && (
                    <>
                      <Col span={24}>
                        <hr
                          style={{
                            border: "none", // Removes the default border
                            height: "2px", // Sets the line thickness
                            backgroundColor: "#f2f2f0", // Sets the line color
                            marginBottom: "5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "financeProvider"]}
                          label="Finance Provider"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the provider",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "dadoNumber"]}
                          label="DA / DO Number"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the DA / DO number",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "scheme"]}
                          label="Scheme"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the scheme",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "upfront"]}
                          label="Upfront"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the upfront",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input type="Number" className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "emiAmount"]}
                          label="EMI Amount"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the EMI amount",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input type="Number" className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "balanceAmount"]}
                          label="Balance Amount"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the balance amount",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input type="Number" className="input-tag-style" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "startDate"]}
                          label="EMI Start Date"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the emi start date",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <DatePicker
                            className="input-tag-style"
                            style={{ width: "100%" }}
                            format="YYYY-MM-DD"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name={["emiDetails", "endDate"]}
                          label="EMI End Date"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the emi end date",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <DatePicker
                            className="input-tag-style"
                            style={{ width: "100%" }}
                            format="YYYY-MM-DD"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {this.state?.paymentType.includes("CARD") && (
                    <>
                      <Col span={24}>
                        <hr
                          style={{
                            border: "none", // Removes the default border
                            height: "2px", // Sets the line thickness
                            backgroundColor: "#f2f2f0", // Sets the line color
                            marginBottom: "5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="cardHolderName"
                          label="Card Holder Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the card holder name",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="Card Holder Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="cardTransactionId"
                          label="Card Transaction ID"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the card transaction ID",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="Card Transaction ID"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="cardType"
                          label="Card Type"
                          rules={[
                            {
                              required: true,
                              message: "Please select the card type",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Select
                            options={[
                              { value: "Credit", label: "Credit" },
                              { value: "Debit", label: "Debit" },
                            ]}
                            className="input-tag-style"
                            placeholder="Card Type"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="cardPayment"
                          label="Card Payment"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the card payment",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="card payment"
                            type="Number"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {this.state?.paymentType.includes("CASH") && (
                    <>
                      <Col span={24}>
                        <hr
                          style={{
                            border: "none", // Removes the default border
                            height: "2px", // Sets the line thickness
                            backgroundColor: "#f2f2f0", // Sets the line color
                            marginBottom: "5px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="cashPayment"
                          label="Cash Payment"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the cash payment",
                            },
                          ]}
                          className="form-input-tag-bottom-space"
                        >
                          <Input
                            className="input-tag-style"
                            placeholder="Cash payment"
                            type="Number"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="description"
                      label="Description"
                      className="form-input-tag-bottom-space"
                    >
                      <TextArea
                        placeholder="Description"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <h3 style={{ color: "blue" }}>Items</h3>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Form.List name="lineItems" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      <Table
                        bordered
                        dataSource={fields}
                        pagination={false}
                        rowKey={(field) => field.key}
                        scroll={{
                          x: "min-content",
                        }}
                        columns={[
                          {
                            title: "Product Name",
                            dataIndex: "productName",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "product", "id"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter Product Name",
                                  },
                                ]}
                                style={{ margin: 0 }}
                              >
                                <Select
                                  options={this.state.productList?.map((e) => ({
                                    value: e.id,
                                    label: e.productName,
                                  }))}
                                  className="custom-select"
                                  style={{
                                    border: "none",
                                    boxShadow: "none",
                                    backgroundColor: "white",
                                  }}
                                  placeholder="Product Name"
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Discount",
                            dataIndex: "discountAmount",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "discountAmount"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter discount amount",
                                  },
                                ]}
                                style={{ margin: 0 }}
                                initialValue={0}
                              >
                                <Input
                                  type="Number"
                                  min={0}
                                  style={{ border: "none", boxShadow: "none" }}
                                  placeholder="Product Name"
                                  onChange={(e) => {
                                    const discountAmount = e.target.value;
                                    const lineItems =
                                      this.form.getFieldValue("lineItems");
                                    const quantity =
                                      lineItems[field.name]?.quantity || 0;
                                    const sellingPrice =
                                      lineItems[field.name]?.pricePerUnit || 0;

                                    // Update `lineTotal`
                                    this.form.setFieldsValue({
                                      lineItems: lineItems.map((item, idx) =>
                                        idx === field.name
                                          ? {
                                              ...item,
                                              lineTotal:
                                                quantity * sellingPrice -
                                                discountAmount,
                                            }
                                          : item
                                      ),
                                    });
                                  }}
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Qty",
                            dataIndex: "quantity",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter quantity",
                                  },
                                ]}
                                style={{ margin: 0 }}
                                initialValue={1}
                              >
                                <Input
                                  style={{ border: "none", boxShadow: "none" }}
                                  placeholder="Quantity"
                                  type="number"
                                  min={1}
                                  onChange={(e) => {
                                    const quantity = e.target.value;
                                    const lineItems =
                                      this.form.getFieldValue("lineItems");
                                    const discountAmount =
                                      lineItems[field.name]?.discountAmount ||
                                      0;
                                    const sellingPrice =
                                      lineItems[field.name]?.pricePerUnit || 0;

                                    // Update `lineTotal`
                                    this.form.setFieldsValue({
                                      lineItems: lineItems.map((item, idx) =>
                                        idx === field.name
                                          ? {
                                              ...item,
                                              lineTotal:
                                                quantity * sellingPrice -
                                                discountAmount,
                                            }
                                          : item
                                      ),
                                    });
                                  }}
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Total Price",
                            dataIndex: "lineTotal",
                            onCell: () => ({
                              style: {
                                textAlign: "right",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) => (
                              <Form.Item
                                {...field}
                                name={[field.name, "lineTotal"]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  placeholder="Line Total"
                                  type="number"
                                  style={{ border: "none", boxShadow: "none" }}
                                  readOnly
                                />
                              </Form.Item>
                            ),
                          },
                          {
                            title: "Action",
                            dataIndex: "action",
                            onCell: () => ({
                              style: {
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px",
                              },
                            }),
                            render: (_, field) =>
                              fields.length > 1 ? (
                                <MinusCircleOutlined
                                  onClick={() => remove(field.name)}
                                  style={{ color: "red", fontSize: "16px" }}
                                />
                              ) : null,
                          },
                        ]}
                      />
                      <br />
                      <Flex justify="flex-end">
                        <Button
                          type="primary"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add
                        </Button>
                      </Flex>
                    </>
                  )}
                </Form.List>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "10px 15px 15px",
                }}
              >
                <h3 style={{ color: "blue" }}>Customer Details</h3>
                <hr
                  style={{
                    border: "none", // Removes the default border
                    height: "2px", // Sets the line thickness
                    backgroundColor: "#f2f2f0", // Sets the line color
                    marginBottom: "10px",
                  }}
                />
                <Row gutter={[5, 5]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "name"]}
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the name",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="Name" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "phoneNumber"]}
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the phoneNumber",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit phone number",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name={["customer", "email"]}
                      label="Email"
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="email"
                        placeholder="Email"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "dateOfBirth"]}
                      label="Date of Birth"
                      className="form-input-tag-bottom-space"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        className="input-tag-style"
                        format="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "gstin"]}
                      label="GSTIN"
                      className="form-input-tag-bottom-space"
                    >
                      <Input className="input-tag-style" placeholder="GSTIN" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name={["customer", "address"]}
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the address",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        placeholder="Address"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "state"]}
                      label="State"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the  state",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input placeholder="State" className="input-tag-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={["customer", "pincode"]}
                      label="Pincode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the pincode",
                        },
                      ]}
                      className="form-input-tag-bottom-space"
                    >
                      <Input
                        type="Number"
                        placeholder="Pincode"
                        className="input-tag-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <hr
                      style={{
                        border: "none", // Removes the default border
                        height: "2px", // Sets the line thickness
                        backgroundColor: "#f2f2f0", // Sets the line color
                        margin: "10px 0px",
                      }}
                    />
                  </Col>
                  {/* hide pupose only */}
                  <Form.Item
                    name="totalAmount"
                    label="totalAmount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="sgstAmount"
                    label="sgst Amount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="cgstAmount"
                    label="cgst Amount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="igstAmount"
                    label="igst Amount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="totalTaxAmount"
                    label="total tax Amount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="roundOff"
                    label="round off"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="totDiscountAmount"
                    label="total Discount Amount"
                    className="form-input-tag-bottom-space"
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  {/* hide purpose only */}
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>Subtotal (₹)</div>
                      <Form.Item
                        name="pricePerUnit"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>IGST (₹)</div>
                      <Form.Item
                        name="igstAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            boxShadow: "none",
                            padding: "0px",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>CGST (₹)</div>
                      <Form.Item
                        name="cgstAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>SGST</div>
                      <Form.Item
                        name="sgstAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>Total Tax (₹)</div>
                      <Form.Item
                        name="totalTaxAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>Discount (₹)</div>
                      <Form.Item
                        name="totDiscountAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Flex justify="space-between" style={{ fontWeight: "600" }}>
                      <div>Round off (₹)</div>
                      <Form.Item
                        name="roundOff"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <hr
                      style={{
                        border: "none", // Removes the default border
                        height: "2px", // Sets the line thickness
                        backgroundColor: "#f2f2f0", // Sets the line color
                        margin: "10px 0px",
                      }}
                    />
                  </Col>
                  <Col span={24} style={{ fontWeight: "600" }}>
                    <Flex justify="space-between">
                      <div>Total Amount (₹)</div>
                      <Form.Item
                        name="totalAmount"
                        style={{
                          padding: "0px",
                          margin: "0px",
                        }}
                      >
                        <Input
                          readOnly
                          style={{
                            border: "0px",
                            textAlign: "end",
                            padding: "0px",
                            boxShadow: "none",
                            borderRadius: "0px",
                            fontWeight: "600",
                          }}
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                  <br />
                  <br />
                  <Flex justify="end" style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={
                        <Spin
                          spinning={this.state.isLoading}
                          indicator={<SyncOutlined spin />}
                          style={{ color: "white" }}
                        />
                      }
                    >
                      {this.state.mode === "add" ? "Submit" : "Update"}
                    </Button>
                  </Flex>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

const InvoiceBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <InvoiceBillClass id={id} navigate={navigate} />;
};

export default InvoiceBill;
