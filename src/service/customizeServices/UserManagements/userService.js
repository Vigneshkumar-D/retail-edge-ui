import { USER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class UserService extends CrudService {
    url = USER_URL;
}
