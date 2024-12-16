import { PAID_SERVICES_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class PaidServiceService extends CrudService {
    url = PAID_SERVICES_URL;
}