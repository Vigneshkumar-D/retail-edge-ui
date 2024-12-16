import { PRODUCT_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class ProductService extends CrudService {
    url = PRODUCT_URL;
}
