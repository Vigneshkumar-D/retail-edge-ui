import { GST_REPORT_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class GSTReportService extends CrudService {
    url = GST_REPORT_URL;
}