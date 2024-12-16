import { WARRANTY_SERVICES_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class WarrantyServiceService extends CrudService {
    url = WARRANTY_SERVICES_URL;
}