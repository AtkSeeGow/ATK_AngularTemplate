import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionRecord } from '../../models/action-record.model';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'dialog-approval-history',
  templateUrl: './dialog-approval-history.html'
})
export class DialogApprovalHistory{
  @Input() actionRecords: ActionRecord[] = [];


}