import { REPORTS_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class ReportsService extends CrudService {
    url = REPORTS_URL;
}