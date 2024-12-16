import { EXPENSE_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class ExpenseService extends CrudService {
    url = EXPENSE_URL;
}