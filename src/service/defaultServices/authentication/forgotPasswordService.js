import { Component } from "react";
import { FORGET_PASSWORD_URL } from "../../defaultServices/constService";
import axios from "axios";

export default class ForgetPasswordService extends Component {
  url = FORGET_PASSWORD_URL;
  post(data) {
    return axios.post(this.url, data);
  }
}
