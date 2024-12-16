import { CUSTOMER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class CustomerService extends CrudService {
    url = CUSTOMER_URL;
}