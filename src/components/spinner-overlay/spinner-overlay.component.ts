import { Component, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'spinner-overlay',
  templateUrl: './spinner-overlay.html',
  styleUrl: './spinner-overlay.css'
})
export class SpinnerOverlayComponent{
  @Input() loadingText: string = "";
  @Input() isOverlayPart: boolean = true;

  isOverlay: boolean = false;

  constructor() { }
}