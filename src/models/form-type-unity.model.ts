import { FormType } from "./enum/form-type.enum";

export class FormTypeUnity {
  static getFormUrl(formType: FormType): string {
    if(formType == FormType.InvoiceApplicationForm)
      return "./InvoiceApplicationForm"
    else  if(formType == FormType.InvoiceVoidingForm)
      return "./InvoiceVoidingForm"
    return "";
  }
}