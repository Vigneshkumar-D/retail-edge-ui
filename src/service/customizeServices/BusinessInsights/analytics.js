import { ANALYTICS_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class AnalyticsService extends CrudService {
    url = ANALYTICS_URL;
}