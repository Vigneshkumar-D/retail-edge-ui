import { SUPPLIER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class SupplierService extends CrudService {
    url = SUPPLIER_URL;
}
