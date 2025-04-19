import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'input-date',
  templateUrl: './input-date.html'
})
export class InputDateComponent {

  @Input() title: string = "";
  @Input() isReadOnly: boolean = false;

  private _inputValue: string = "";
  @Input()
  get inputValue(): string {
    return this._inputValue;
  }
  set inputValue(inputValue: string) {
    this._inputValue = inputValue;
    this.inputValueChange.emit(this._inputValue);
  }

  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}