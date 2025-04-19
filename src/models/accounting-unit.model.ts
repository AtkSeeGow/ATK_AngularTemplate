import { Messages } from "./messages.model";

export class AccountingUnit {
    unitId: string = "";
    unitName: string = "";
    isFC: boolean = false;
    amount: number = 0;

    valid() : Messages{
        var messages = new Messages();
        if(this.unitId === "")
            messages.errorMessages["unitId"] = "請輸入入帳單位代碼...";
        if(this.amount === 0)
            messages.errorMessages["amount"] = "請輸入入帳單位金額...";

        messages.isValid = Object.keys(messages.errorMessages).length == 0;

        return messages;
    }

    clone(accountingUnit: AccountingUnit){
        this.unitId = accountingUnit.unitId;
        this.unitName = accountingUnit.unitName;
        this.isFC = accountingUnit.isFC;
        this.amount = accountingUnit.amount;
    }
}