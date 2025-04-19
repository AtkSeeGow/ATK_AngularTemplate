import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PagingAssist } from '../../models/paging-assist.model';
import { Option } from '../../models/option.model';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  selector: 'input-autocomplete',
  templateUrl: './input-autocomplete.html'
})
export class InputAutocompleteComponent {
  @ViewChild('inputElement') inputElement!: ElementRef;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  @Input() model: string = "";
  @Input() title: string = "";
  @Input() isReadOnly: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() getPagingAssistEvent!: ((value: string) => Observable<PagingAssist<Option>>);
  @Input() blurDipslayFormat: string = "${this.name}(${this.value})";

  private _name: string = '';
  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.renderer();
    this.nameChange.emit(this._name);
  }
  @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();

  private _value: string = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this.renderer();
    this.valueChange.emit(this._value)
  }
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  isEdited: boolean = false;

  constructor() { }

  formControl = new FormControl('');
  filteredOptions!: Observable<Option[]>;
  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.getPagingAssistEvent(value!).pipe(
        map((pagingAssist: PagingAssist<Option>) => pagingAssist.target),
        catchError(() => of([]))
      )
      ));
  }

  onOptionSelected(event: any) {
    console.log('onOptionSelected');
    this.name = event.option.value.name;
    this.value = event.option.value.value;
  }

  click() {
    if(!this.isReadOnly){
      if (this.model == "select")
        this.trigger();
    }
  }

  trigger() {
    this.formControl.setValue(this.value);
  }

  blur() {
    if(!this.isReadOnly){
      this.isEdited = false;
      if (this.name == '') {
        this.getPagingAssistEvent(this.value).subscribe(pagingAssist =>
          pagingAssist.target.forEach(item => {
            if (item.value == this.value || item.name == this.value) {
              this.value = item.value;
              this.name = item.name;
              this.renderer();
            }
          }));
      }
      this.renderer();
    }
  }

  focus() {
    this.isEdited = true;
    if(!this.isReadOnly)
      this.inputElement.nativeElement.value = this.value;
  }

  change() {
    this.value = this.inputElement.nativeElement.value;
    this.name = "";
  }

  renderer() {
    if (this.inputElement && !this.isEdited) {
      if(this.name != '' && this.value != '')
        this.inputElement.nativeElement.value = this.blurDipslayFormat.replace('${this.name}', this._name).replace('${this.value}', this._value);
      else
        this.inputElement.nativeElement.value = this.value;
    }
  }
}