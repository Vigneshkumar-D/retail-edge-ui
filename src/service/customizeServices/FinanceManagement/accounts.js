import { ACCOUNTS_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class AccountsService extends CrudService {
    url = ACCOUNTS_URL;
}