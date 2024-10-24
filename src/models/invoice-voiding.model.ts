import { NodeType } from "./enum/node-type.enum";
import { FlowInfo } from "./flow-info.model";
import { Option } from "./option.model";

export class InvoiceVoiding {
    applicantUnitName: string | undefined;
    applicantPersontName: string | undefined;
    businessTypeName: string | undefined;
    customerGroupName: string | undefined;
    customerName: string | undefined;
    invoiceItemDescription: string | undefined;
    applicationReason: string | undefined;
    businessTypeCode: string | undefined;
    invoiceDate: string | undefined;
    invoiceNumber: string | undefined;
    formId: string | undefined;
    formNumber: string | undefined;
    applicationDate: Date | undefined;
    applicantUnitId: string | undefined;
    applicantPersonId: string | undefined;
    id: string | undefined;

    // 稅別
    taxType: Option[] = [];

    // 發票別
    invoiceType: Option[] = [];
  
    // 發票抬頭(買受人)
    buyerCode: string = "";
    buyerName: string = "";
  
    invoiceAmount: number = 0;
    salesAmount: number = 0;
    taxAmount: number = 0;
  
    // 客戶群組代碼(過濾買受人用)
    customerGroupCode: string = "";

    isReadOnly(field: string, flowInfo: FlowInfo): boolean {
        if (!flowInfo.matchNode) {
            return true;
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
}