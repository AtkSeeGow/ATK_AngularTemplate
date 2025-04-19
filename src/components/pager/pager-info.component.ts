import { Component, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagerModel } from './pager.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'pager-info',
  templateUrl: './pager-info.html'
})
export class PagerInfoComponent {
  @Input() model: PagerModel = new PagerModel();
  @Input() onlyRecordCount: boolean = false

  get startIndexProxy() { return this.model.startIndex + 1; }

  get lastIndexProxy() {
    var model = this.model;
    if (model.startIndex + model.pageSize < model.recordCount) {
      return model.startIndex + model.pageSize;
    } else {
      return model.recordCount;
    }
  }


  constructor() { }
}