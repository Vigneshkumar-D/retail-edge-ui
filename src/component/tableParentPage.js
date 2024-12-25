import { message } from "antd";
import dayjs from "dayjs";
import React, { Component } from "react";

class TableParentPage extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = { isLoading: false, pdfData: null };
  }
  componentDidMount() {
    this.tableDataCall();
  }
  save(data) {
    this.setState({ isLoading: true });
    if (this.state.mode === "add") {
      this.service
        .create(data)
        .then((res) => {
          message.success("Item Added successfully");
          this.tableDataCall();
          this.setState({ mode: null, formOpen: false });
          this.formRef.current.resetFields();
        })
        .catch((err) => {
          message.error(err.response.data?.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.service
        .updateItem(this.state.id, data)
        .then((res) => {
          message.success("Item Updated successfully");
          this.tableDataCall();
          this.setState({ mode: null, id: null, formOpen: false });
          this.formRef.current.resetFields();
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  tableDataCall() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        this.setState({ data: [] });
        message.error(err.response.data?.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  delete(id) {
    this.setState({ isLoading: true });
    this.service
      .deleteItem(id)
      .then((res) => {
        message.success("Item Deleted successfully");
        this.tableDataCall();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  handleCancel = () => {
    this.setState({ isLoading: true });
    this.formRef.current.resetFields();
    this.setState({ formOpen: false, mode: null, id: null, isLoading: false });
  };

  editForm = (id) => {
    this.setState({ isLoading: true });
    let formData = this.state.data.find((e) => e.id === id);

    if (formData) {
      this.setState({ formData });
      // Process formData to convert date fields to dayjs objects
      const processedFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          key.toLowerCase().includes("date") && value ? dayjs(value) : value,
        ])
      );

      this.setState({ formOpen: true, mode: "edit", id }, () => {
        // Wait until form is rendered, then set fields
        if (this.formRef.current) {
          this.formRef.current.setFieldsValue(processedFormData);
        }
      });
    }

    this.setState({ isLoading: false });
  };

  viewForm = (id) => {
    this.setState({ isLoading: true });
    let formData = this.state.data.find((e) => e.id === id);

    if (formData) {
      // Process formData to convert date fields to dayjs objects
      const processedFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          key.toLowerCase().includes("date") && value ? dayjs(value) : value,
        ])
      );

      this.setState({ formOpen: true, mode: "view", id }, () => {
        // Wait until form is rendered, then set fields
        if (this.formRef.current) {
          this.formRef.current.setFieldsValue(processedFormData);
        }
      });
    }
    this.setState({ isLoading: false });
  };
}

export default TableParentPage;
