import { CREDIT_REMINDER_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class CreditReminderService extends CrudService {
    url = CREDIT_REMINDER_URL;
}