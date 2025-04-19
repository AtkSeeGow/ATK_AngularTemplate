import { FormType } from "./enum/form-type.enum";

export interface TodoInfo {
  formId: string;
  formNumber: string;
  applicantUnitId: string;
  applicantPersonId: string;
  receiveType: number;
  receiveId: string;
  createDate: string;
  receiptDate: string;
  formType: FormType;
  processType: number;
  isEnabled: boolean;
  applicantUnitName: string;
  applicantPersonName: string;
  receiveName: string;
  nodeName: string;
  formTypeName: string;
  id: string;
}