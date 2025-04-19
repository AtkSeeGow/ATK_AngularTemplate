import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LayoutPixelArtComponent } from '../layout-pixel-art/layout-pixel-art.component';
import { TodoInfoComponent } from '../../parts/todo-info/todo-info.component';
import { ProcessType } from '../../models/enum/process-type.enum';
import { HttpClient } from '@angular/common/http';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutPixelArtComponent,
    TodoInfoComponent
  ],
  templateUrl: './sample-layout-pixel-art.html'
})
export class SampleLayoutPixelArtComponent {

  @ViewChildren(TodoInfoComponent) todoInfoComponents: QueryList<TodoInfoComponent> | undefined;
  
    constructor(private httpClient: HttpClient) { }
  
    ProcessType = ProcessType;

    ngAfterViewInit() {
      this.todoInfoComponents!.forEach(component => {
        component.pageChange();
      });
    }
}