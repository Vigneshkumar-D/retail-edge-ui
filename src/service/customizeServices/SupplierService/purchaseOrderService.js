import { PURCHASE_ORDER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class PurchaseOrderService extends CrudService {
    url = PURCHASE_ORDER_URL;
}
