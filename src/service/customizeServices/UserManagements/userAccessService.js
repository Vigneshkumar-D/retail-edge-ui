import { USER_ACCESS_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class UserAccessService extends CrudService {
    url = USER_ACCESS_URL;
}
