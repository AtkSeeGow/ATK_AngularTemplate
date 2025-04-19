import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputCurrencyDirective } from '../../directives/input-currency.directive';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputCurrencyDirective
  ],
  selector: 'input-currency',
  templateUrl: './input-currency.html'
})
export class InputCurrencyComponent implements AfterViewInit {

  @ViewChild(InputCurrencyDirective, { static: false }) inputCurrencyDirective: InputCurrencyDirective | undefined;

  @Input() id: string = "";
  @Input() title: string = "";
  @Input() isReadOnly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() linkageEvent: (value: string) => void = function () {  }

  private _inputValue: number = 0;
  @Input()
  get inputValue(): number {
    return this._inputValue;
  }
  set inputValue(inputValue: number) {
    this._inputValue = inputValue;
    this.renderer();
  }
  @Output() inputValueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngAfterViewInit(): void {
    this.renderer();
  }

  renderer(){
    if (this.inputCurrencyDirective) {
      this.inputCurrencyDirective.el.nativeElement.value = this.inputValue.toString();
      this.inputCurrencyDirective.onBlur();
    }
  }

  change(event: any){
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.valueAsNumber;
    this._inputValue = value;
    this.inputValueChange.emit(this._inputValue);

    if(this.linkageEvent)
      this.linkageEvent(this.id);
  }
}