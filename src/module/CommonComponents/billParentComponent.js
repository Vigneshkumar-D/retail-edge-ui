import { message } from "antd";
import TableParentPage from "../../component/tableParentPage";
import dayjs from "dayjs";

class BillParentComponent extends TableParentPage {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      salesManList: [],
      mode: "add",
      id:null
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.userService
      .getAll()
      .then((res1) => {
        this.setState({ salesManList: res1.data.data, mode: "add" });
        if (this.props.id) {
          this.setState({ mode: "update", id: this.props.id });
          this.service.getAll({ id: this.props.id }).then((res) => {
            if (this.form) {
              // Function to process nested objects and convert dates
              const processFormDataDeep = (data) => {
                if (typeof data !== "object" || data === null) {
                  // Return non-object values as-is
                  return data;
                }

                if (Array.isArray(data)) {
                  // Process arrays recursively
                  return data.map((item) => processFormDataDeep(item));
                }

                // Process objects
                return Object.fromEntries(
                  Object.entries(data).map(([key, value]) => [
                    key,
                    key.toLowerCase().includes("date") && value
                      ? dayjs(value)
                      : processFormDataDeep(value),
                  ])
                );
              };

              // Process the response data
              const processedFormData = processFormDataDeep(res.data[0]);

              // Set the processed data into the form
              this.form.setFieldsValue(processedFormData);
            }
          });
        }
      })
      .catch((err) => message.error(err.response.data.message))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  save(data) {
    if (this.state.mode === "add") {
      this.service
        .create(data)
        .then((res) => {
          message.success("Item Added successfully");
          this.props.navigate(this.updateUrl, { replace: true });
        })
        .catch((err) => {
          message.error(err.response?.data?.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.service
        .updateItem(this.state.id, data)
        .then((res) => {
          message.success("Item Updated successfully");
          this.props.navigate(this.updateUrl, { replace: true });
        })
        .catch((err) => {
          message.error(err.response.data.message);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
}

export default BillParentComponent;
