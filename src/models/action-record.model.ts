import { Transit } from "./transit.model";

export class ActionRecord {
  comment: string = "";
  createDate: string = "";
  departmentId: string = "";
  departmentName: string = "";
  formId: string = "";
  id: string = "";
  personId: string = "";
  personName: string = "";
  transit: Transit = new Transit();
}