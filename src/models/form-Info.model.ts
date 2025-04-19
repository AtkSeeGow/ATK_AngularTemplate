import { ActivationStatus } from "./enum/activation-status.enum";
import { FormType } from "./enum/form-type.enum";

export class FormInfo {
    formId: string = '';
    activationStatus: ActivationStatus = ActivationStatus.None;
    formType: FormType = FormType.None;
    id: string = '';
}