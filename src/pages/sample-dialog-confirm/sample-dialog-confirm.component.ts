import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChildren, QueryList } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    DialogConfirmComponent
  ],
  templateUrl: './sample-dialog-confirm.html'
})
export class SampleDialogConfirmComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: { message: '這是傳入的資料' },
    });

    dialogRef.afterClosed().subscribe(isConfirm => {
      alert(`確認結果(${isConfirm})`)
    });
  }
}