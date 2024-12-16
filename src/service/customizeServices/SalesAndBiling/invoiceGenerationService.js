import { INVOICE_GENERATION_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class InvoiceGenerationService extends CrudService {
    url = INVOICE_GENERATION_URL;
}
