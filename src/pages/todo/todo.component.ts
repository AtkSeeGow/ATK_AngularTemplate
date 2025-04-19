import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { TodoInfoComponent } from '../../parts/todo-info/todo-info.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProcessType } from '../../models/enum/process-type.enum';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    TodoInfoComponent
  ],
  templateUrl: './todo.html'
})
export class TodoComponent implements AfterViewInit {
  @ViewChildren(TodoInfoComponent) todoInfoComponents: QueryList<TodoInfoComponent> | undefined;

  constructor(private httpClient: HttpClient) { }

  ProcessType = ProcessType;

  ngAfterViewInit() {
    this.todoInfoComponents!.forEach(component => {
      component.pageChange();
    });
  }
}