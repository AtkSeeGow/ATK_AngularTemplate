import { AccountingUnit } from "./accounting-unit.model";
import { NodeType } from "./enum/node-type.enum";
import { FlowInfo } from "./flow-info.model";
import { Option } from "./option.model";

export class InvoiceApplication {
    applicantUnitName: string | undefined;
    applicantPersontName: string | undefined;
    businessTypeName: string | undefined;
    customerGroupName: string | undefined;
    customerName: string | undefined;
    applicationReason: string | undefined;
    businessTypeCode: string | undefined;
    customerGroupCode: string | undefined;
    customerCode: string | undefined;
    formId: string | undefined;
    formNumber: string | undefined;
    applicationDate: string | undefined;
    applicantUnitId: string | undefined;
    applicantPersonId: string | undefined;
    id: string | undefined;

    // --------------------------------------------

    accountingUnits: AccountingUnit[] = [];

    // --------------------------------------------

    accountingDocumentType: Option[] = [];

    invoiceItemCode: string | undefined;
    invoiceItemDescription: string | undefined;

    taxType: Option[] = [];
    invoiceType: Option[] = [];

    buyerCode: string | undefined;
    buyerName: string | undefined;

    invoiceAmount: number = 0;
    salesAmount: number = 0;
    taxAmount: number = 0;

    // --------------------------------------------

    invoiceDate: string | undefined;
    paymentMethod: Option[] = [];

    // --------------------------------------------

    linkageAmount(field: string) {
        if (this.taxType.some(item => item.value === "Taxable" && item.isChecked)) {
            if (field == "invoiceAmount") {
                this.taxAmount = Math.round(this.invoiceAmount * 0.05);
                this.salesAmount = this.invoiceAmount - this.taxAmount;
            }
            else if (field == "salesAmount") {
                this.invoiceAmount = Math.round(this.salesAmount / 0.95);
                this.taxAmount = this.invoiceAmount - this.salesAmount;
            }
            else if (field == "taxAmount") {
                this.invoiceAmount = this.salesAmount + this.taxAmount;
            }
        }
        else {
            this.taxAmount = 0;
            if (field == "invoiceAmount")
                this.salesAmount = this.invoiceAmount;
            else if (field == "salesAmount")
                this.invoiceAmount = this.salesAmount;
        }
    }

    linkageInvoiceInfo(field: string) {
        this.linkageAmount("invoiceAmount");

        // 零稅改發票別為二聯式
        if (this.taxType.some(item => item.value === "ZeroTax" && item.isChecked)) {
            var invoiceType: Option[] = [];
            this.invoiceType.forEach(item => {
                if (item.value == "Duplicate")
                    item.isChecked = true;
                else
                    item.isChecked = false;
                invoiceType.push(item);
            });
            this.invoiceType = invoiceType;
        }
    }

    isReadOnly(field: string, flowInfo: FlowInfo): boolean {
        if (!flowInfo.matchNode) {
            return true;
        }

        if (field == "invoiceDate" ||
            field == "paymentMethod" ||
            field == "accountingDocumentType" ||
            field == "inputInvoiceItems" ||
            field == "customerGroupCode" ||
            field == "customerCode"
        ) {
            if (flowInfo.matchNode.nodeType == NodeType.CreateJournal)
                return false
        }
        else if (flowInfo.matchNode.nodeType == NodeType.Apply) {
            // 零稅改發票別為唯獨
            if (this.taxType.some(item => item.value === "ZeroTax" && item.isChecked)) {
                if(field == "invoiceType")
                    return true;
            }

            return false;
        }


        return true;
    }
}