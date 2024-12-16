import { EXPENSE_CATEGORY_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class ExpenseCategoryService extends CrudService {
    url = EXPENSE_CATEGORY_URL;
}