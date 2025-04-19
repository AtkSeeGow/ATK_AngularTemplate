import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SpinnerOverlayComponent
  ],
  selector: 'input-csv',
  templateUrl: './input-csv.html'
})
export class InputCsvComponent{
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  csvData: any[] | null = null;

  constructor() { }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        this.parseCsv(text);
      };
      reader.readAsText(file);
    }
  }

  parseCsv(data: string): void {
    const rows = data.split('\n').map(row => row.split(','));
    const headers = rows[0];
    this.csvData = rows.slice(1).map(row => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = row[index]?.trim();
      });
      return obj;
    });
  }
}