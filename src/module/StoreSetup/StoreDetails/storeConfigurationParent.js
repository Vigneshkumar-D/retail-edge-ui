import React, { Component } from "react";
import dayjs from "dayjs";
import { message } from "antd";

class StoreConfigurationParent extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  formRef = React.createRef();

  componentDidMount() {
    this.setState({ isLoading: true });
    this.service
      .getAll()
      .then((res) => {
        if (res.data.data.length > 0) {
          const processedFormData = Object.fromEntries(
            Object.entries(res.data.data[0]).map(([key, value]) => [
              key,
              key.toLowerCase().includes("date") && value
                ? dayjs(value)
                : value,
            ])
          );

          console.log("hit", res.data.data[0].id);
          this.setState({ id: res.data.data[0].id });

          if (this.formRef.current) {
            this.formRef.current.setFieldsValue(processedFormData);
          }
        }
      })
      .catch((err) => {
        message.error(err.response.data.message || "Failed to create entry");
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  save = (data) => {
    const formData = new FormData();
    // Append all form data, including storeLogo, to the FormData object

    // Object.keys(data).forEach((key) => {
    //   // Check if the key contains 'image' and it has a valid file
    //   if (key.toLowerCase().includes("image") && data[key]?.[0]?.originFileObj) {
    //     console.log("File to be uploaded:", data[key][0].originFileObj);
    //     formData.append(key, data[key][0].originFileObj); // Append the file
    //   } else {
    //     formData.append(key, data[key]); // Append other fields
    //   }
    // });

    Object.keys(data).forEach((key) => {
      if (key.toLowerCase().includes("image") && Array.isArray(data[key])) {
        const file = data[key][0]?.originFileObj; // Extract the actual file
        console.log("Uploading file:", file);
        if (file) {
          console.log("key:", key);
          formData.append(key, file); // Append file to FormData
        }
      } else {
        formData.append(key, data[key]); // Append other fields
      }
    });

    // Indicate loading state
    this.setState({ isLoading: true });

    if (!this.state.id) {
      // Create a new entry with FormData
      this.service
        .createFile(formData) // Ensure the service method accepts FormData
        .then((res) => {
          message.success("Created successfully");
          this.formRef.current.setFieldsValue(res.data); // Update form values with server response
        })
        .catch((err) => {
          message.error(err.response.data.message || "Failed to create entry");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      // Update an existing entry with FormData
      this.service
        .updateFile(this.state.id, formData) // Ensure the service method accepts FormData
        .then((res) => {
          message.success("Updated successfully");
          this.formRef.current.setFieldsValue(res.data); // Update form values with server response
        })
        .catch((err) => {
          message.error(err.response.data.message || "Failed to update entry");
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };
}

export default StoreConfigurationParent;
