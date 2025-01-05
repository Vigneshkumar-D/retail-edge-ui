import { SETTLEMENT_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";


export default class SettlementService extends CrudService {
    url = SETTLEMENT_URL;
}