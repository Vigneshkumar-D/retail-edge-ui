import { NOTIFICATION_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class NotificationService extends CrudService {
    url = NOTIFICATION_URL;
}
