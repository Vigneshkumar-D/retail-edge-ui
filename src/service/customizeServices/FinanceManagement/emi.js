import { EMI_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class EmiService extends CrudService {
    url = EMI_URL;
}