import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { InputCsvComponent } from '../../components/input-csv/input-csv.component';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    InputCsvComponent
  ],
  templateUrl: './sample-input-csv.html'
})
export class SampleInputCsvComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
  }
}