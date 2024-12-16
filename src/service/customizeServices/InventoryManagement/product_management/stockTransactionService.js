import { STOCK_TRANSACTION_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class StockTransactionService extends CrudService {
    url = STOCK_TRANSACTION_URL;
}
