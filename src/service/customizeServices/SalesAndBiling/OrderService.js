import { ORDER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class OrderService extends CrudService {
    url = ORDER_URL;
}
