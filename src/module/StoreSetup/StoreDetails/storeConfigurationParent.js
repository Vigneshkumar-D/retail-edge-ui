import React, { Component } from "react";
import { message } from "antd";

class StoreConfigurationParent extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = {
      isLoading: false,
      previewVisible: false,
      previewImage: "",
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  formRef = React.createRef();

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        if (res.data.data.length > 0) {
          const storeData = res.data.data[0];

          // Process storeLogoImage for Upload component
          const fileList =
            storeData.storeLogoImage &&
            typeof storeData.storeLogoImage === "string"
              ? [
                  {
                    uid: "-1",
                    name: "store-logo.jpg",
                    status: "done",
                    url: storeData.storeLogoImage, // Assuming this is the image URL
                  },
                ]
              : [];

          // Set processed form data
          const processedFormData = {
            ...storeData,
            storeLogoImage: fileList, // Use the formatted file list
          };

          this.setState({ id: storeData.id });
          if (this.formRef.current) {
            this.formRef.current.setFieldsValue(processedFormData);
          }
        }
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Failed to fetch data");
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  save = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().includes("image") && Array.isArray(data[key])) {
        const file = data[key][0]?.originFileObj; // Extract file
        if (file) {
          formData.append(key, file); // Append file to FormData
        }
      } else {
        formData.append(key, data[key]); // Append other fields
      }
    });

    this.setState({ isLoading: true });
    const isUpdate = !!this.state.id;
    const action = isUpdate
      ? this.service.updateFile(this.state.id, formData)
      : this.service.createFile(formData);

    action
      .then((res) => {
        message.success(
          isUpdate ? "Updated successfully" : "Created successfully"
        );
        this.formRef.current.setFieldsValue(res.data);
      })
      .catch((err) => {
        message.error(
          err.response?.data?.message ||
            `Failed to ${isUpdate ? "update" : "create"} entry`
        );
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleFileChange = ({ fileList }) => {
    // Enforce a single file in the file list
    if (fileList.length > 1) {
      fileList = [fileList[fileList.length - 1]]; // Keep only the most recent file
    }

    // Update state and form value
    this.formRef.current?.setFieldsValue({
      storeLogoImage: fileList,
    });
    this.setState({ fileList });
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
}

export default StoreConfigurationParent;
