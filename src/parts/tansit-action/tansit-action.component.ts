import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlowInfo } from '../../models/flow-info.model';
import { Transit } from '../../models/transit.model';
import { DialogApprovalStateComponent } from '../../components/dialog-approval-state/dialog-approval-state.component';
import { DialogApprovalHistory } from '../../components/dialog-approval-history/dialog-approval-history.component';
import { DialogTransitActionComponent, DialogTransitActionModel } from '../../components/dialog-transit-action/dialog-transit-action.component';
import { ActionRecord } from '../../models/action-record.model';
import { FormInfo } from '../../models/form-Info.model';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DialogApprovalStateComponent,
    DialogApprovalHistory,
    DialogTransitActionComponent
  ],
  selector: 'tansit-action',
  templateUrl: './tansit-action.html'
})
export class TansitActionComponent implements OnChanges {
  @Input() formInfo!: FormInfo;
  @Input() flowInfo!: FlowInfo;
  @Input() actionRecords: ActionRecord[] = [];
  @Input() actionEvent: (component: DialogTransitActionComponent, parameters: { [key: string]: string }) => void = function () { }

  matchTransits: Transit[] = [];
  dialogTransitActionModels: DialogTransitActionModel[] = [];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flowInfo']) {
      if (this.flowInfo && this.flowInfo.transits) {
        this.dialogTransitActionModels = [];
        if(this.flowInfo.matchNode){
          this.matchTransits = this.flowInfo.transits.filter(transit => transit.entryNode?.id === this.flowInfo.matchNode.id);
          this.matchTransits.forEach((transit: Transit) => {
            var dialogTransitActionModel = new DialogTransitActionModel();
            dialogTransitActionModel.update(this.flowInfo, this.formInfo.formType, transit, this.actionEvent)
            this.dialogTransitActionModels.push(dialogTransitActionModel);
          });
        }
      }
    }
  }
}