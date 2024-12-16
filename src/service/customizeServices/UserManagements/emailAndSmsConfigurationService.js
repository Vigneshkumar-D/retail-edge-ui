import { EMAIL_AND_SMS_CONFIGURATION_URL } from "../../defaultServices/constService";
import CrudService from "../../defaultServices/crudService";

export default class EmailAndSmsConfigurationService extends CrudService {
  url = EMAIL_AND_SMS_CONFIGURATION_URL;
}
