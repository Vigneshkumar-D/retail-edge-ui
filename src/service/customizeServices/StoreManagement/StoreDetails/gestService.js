import { GST_URL } from "../../../defaultServices/constService";
import CrudService from "../../../defaultServices/crudService";

export default class GstService extends CrudService {
    url = GST_URL;
}
