import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Option } from '../../models/option.model';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  selector: 'input-select',
  templateUrl: './input-select.html'
})
export class InputSelectComponent {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() isReadOnly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() linkageEvent: (value: string) => void = function () { }

  private _options: Option[] = [];
  @Input()
  get options(): Option[] {
    return this._options;
  }
  set options(options: Option[]) {
    this._options = options;
    var items = this._options.filter((item) => item.isChecked);
    if (items.length > 0)
      this.selectedValue = items[0].value;
  }
  @Output() optionsChange: EventEmitter<Option[]> = new EventEmitter<Option[]>();

  selectedValue: string = "";

  constructor() { }

  change(event: any) {
    const selectElement = event.target as HTMLInputElement;
    const value = selectElement.value;

    this.options.forEach((item) => item.isChecked = false);

    var items = this.options.filter((item) => item.value == value)
    if (items.length > 0)
      items[0].isChecked = true;

    if (this.linkageEvent)
      this.linkageEvent(this.id);
  }
}