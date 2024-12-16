import { CATEGORY_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class CategoryService extends CrudService {
    url = CATEGORY_URL;
}
