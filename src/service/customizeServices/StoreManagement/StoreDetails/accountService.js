import { STORE_ACCOUNT_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class AccountService extends CrudService {
    url = STORE_ACCOUNT_URL;
}
