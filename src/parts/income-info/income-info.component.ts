import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlowInfo } from '../../models/flow-info.model';
import { AccountingUnit } from '../../models/accounting-unit.model';
import { InputCurrencyComponent } from '../../components/input-currency/input-currency.component';
import { InputAutocompleteComponent } from '../../components/input-autocomplete/input-autocomplete.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { PagingAssist } from '../../models/paging-assist.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Option } from '../../models/option.model';
import { NotifyMessageComponent } from '../../components/notify-message.component';

@Component({
  standalone: true,
  imports: [ 
    FormsModule,
    CommonModule,
    InputCurrencyComponent,
    InputAutocompleteComponent
  ],
  selector: 'income-info',
  templateUrl: './income-info.html'
})
export class IncomeInfoComponent {
  @Input() model!: IncomeInfoModel;
  @Input() flowInfo!: FlowInfo;

  accountingUnit: AccountingUnit = new AccountingUnit();

  constructor(private httpClient: HttpClient) { }

  insert(){
    var messages = this.accountingUnit.valid();
    if(!messages.isValid)
    {
      NotifyMessageComponent.popupByDisplayTime(messages, 1000, 1000);
      return;
    }

    this.model.accountingUnits.push(this.accountingUnit);
    this.accountingUnit = new AccountingUnit(); 
  }

  edit(accountingUnit: AccountingUnit){
    this.accountingUnit.clone(accountingUnit) ;
  }

  cancel(){
    this.accountingUnit = new AccountingUnit(); 
  }

  total(){
    var value = 0;
    this.model.accountingUnits.forEach((item: AccountingUnit) => { value = value + item.amount;  })
    return value
  }

  delete(accountingUnit: AccountingUnit){
    const index = this.model.accountingUnits.findIndex(item => 
      item.unitId === accountingUnit.unitId &&
      item.amount == accountingUnit.amount
    );
    if (index !== -1) {
        this.model.accountingUnits.splice(index, 1);
    }
  }

  getOrganization(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5);

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchOrganizationBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.organizationName;
          option.value = item.organizationCode;
          pagingAssist.target.push(option);
        });
        return pagingAssist;
      }),
      catchError((error: HttpErrorResponse) => {
        NotifyMessageComponent.popupBy(error);
        return throwError(() => new Error(''));
      })
    );
  }
}

export class IncomeInfoModel {
  accountingUnits: AccountingUnit[] = [];
  isReadOnly: (field: string, flowInfo: FlowInfo) => boolean = function () { return true; }
}