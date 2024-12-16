import { PAYMENT_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class PaymentService extends CrudService {
    url = PAYMENT_URL;
    
}
