import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Option } from '../../models/option.model';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SpinnerOverlayComponent
  ],
  selector: 'input-valid',
  templateUrl: './input-valid.html'
})
export class InputValidComponent{
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  @Input() title: string = "";
  @Input() isReadOnly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() validEvent: (component: InputValidComponent) => void = function () {  }

  private _value: string = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this.valueChange.emit(this._value)
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  verificationFailureMessage: string = "";

  constructor() { }

  blur(){
    var component = this;
    this.validEvent(component);
  }
}