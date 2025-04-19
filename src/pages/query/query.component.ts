import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { QueryResultComponent } from '../../parts/query-result/query-result.component';
import { QueryConditionComponent } from '../../parts/query-condition/query-condition.component';
import { Condition } from '../../models/condition.model';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    QueryConditionComponent,
    QueryResultComponent
  ],
  templateUrl: './query.html'
})
export class QueryComponent implements AfterViewInit {
  @ViewChild(QueryResultComponent, { static: false }) queryResultComponent: QueryResultComponent | undefined;

  condition!: Condition
  
  constructor() { }

  ngAfterViewInit() {
    this.condition = new Condition();
    this.condition.pageSize = 25;
  }

  queryEvent(){
    this.queryResultComponent!.spinnerOverlayComponent!.isOverlay = true;
    this.queryResultComponent!.pageChange();
  }
}