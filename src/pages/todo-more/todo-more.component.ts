import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { TodoInfoComponent } from '../../parts/todo-info/todo-info.component';
import { ProcessType } from '../../models/enum/process-type.enum';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    TodoInfoComponent
  ],
  templateUrl: './todo-more.html'
})
export class TodoMoreComponent implements AfterViewInit {
  @ViewChild(TodoInfoComponent, { static: false }) todoInfoComponent: TodoInfoComponent | undefined;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit() {
    var processType = this.getProcessType();
    this.todoInfoComponent!.processType = processType;
    this.todoInfoComponent!.pagerModel.pageSize = 25;
    this.todoInfoComponent?.pageChange();

    if(processType == ProcessType.Approval)
      this.todoInfoComponent!.title = "待審核";
    else if(processType == ProcessType.Progress)
      this.todoInfoComponent!.title = "進行中";
    else if(processType == ProcessType.Notification)
      this.todoInfoComponent!.title = "通知";
    else if(processType == ProcessType.Temporary)
      this.todoInfoComponent!.title = "暫存"
  }

  getProcessType(): ProcessType{
    return parseInt(this.activatedRoute.snapshot.queryParams['processType']);
  }
}