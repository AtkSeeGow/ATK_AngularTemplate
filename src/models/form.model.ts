import { ActionRecord } from "./action-record.model";
import { FlowInfo } from "./flow-info.model";
import { FormInfo } from "./form-Info.model";

export class Form<Model> {
    model!: Model;
    formInfo!: FormInfo;
    flowInfo!: FlowInfo;
    actionRecords!: ActionRecord[];
}