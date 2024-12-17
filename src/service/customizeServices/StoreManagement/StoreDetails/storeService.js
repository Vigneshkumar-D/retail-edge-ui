import { STORE_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class StoreService extends CrudService {
    url = STORE_URL;
}
