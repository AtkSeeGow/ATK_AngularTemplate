import { Pipe, PipeTransform } from '@angular/core';
import { FormType } from '../models/enum/form-type.enum';

@Pipe({
    standalone: true,
    name: 'formUrl'
})
export class FormUrlPipe implements PipeTransform {
    transform(formId: string, formType: FormType): string {
        switch (formType) {
            case FormType.InvoiceApplicationForm:
                return `./InvoiceApplicationForm?formId=${formId}`;
            case FormType.InvoiceVoidingForm:
                return `./InvoiceVoidingForm?formId=${formId}`;
            default:
                return '';
        }
    }
}
