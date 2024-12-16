import { ROLE_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class RoleService extends CrudService {
    url = ROLE_URL;
}
