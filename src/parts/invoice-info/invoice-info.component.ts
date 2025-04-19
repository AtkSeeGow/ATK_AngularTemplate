import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputCurrencyComponent } from '../../components/input-currency/input-currency.component';
import { Option } from '../../models/option.model';
import { InputSelectComponent } from '../../components/input-select/input-select.component';
import { InputAutocompleteComponent } from '../../components/input-autocomplete/input-autocomplete.component';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { PagingAssist } from '../../models/paging-assist.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { FlowInfo } from '../../models/flow-info.model';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputCurrencyComponent,
    InputSelectComponent,
    InputAutocompleteComponent
  ],
  selector: 'invoice-info',
  templateUrl: './invoice-info.html'
})
export class InvoiceInfoComponent {
  @Input() model!: InvoiceInfoModel;
  @Input() flowInfo!: FlowInfo;

  constructor(private httpClient: HttpClient) {
  }

  getBuyer(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5)
      .set('customerGroupCode', this.model.customerGroupCode);

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchBuyerBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.customerName;
          option.value = item.customerCode;
          option.toString = function(){ return `${this.name}(${this.value})`};
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

export class InvoiceInfoModel {
  taxType: Option[] = [];
  invoiceType: Option[] = [];

  buyerCode: string = "";
  buyerName: string = "";

  invoiceAmount: number = 0;
  salesAmount: number = 0;
  taxAmount: number = 0;

  customerGroupCode: string = "";

  linkageAmount: (value: string) => void = function () { }

  linkageInvoiceInfo: (value: string) => void = function () { }

  isReadOnly: (field: string, flowInfo: FlowInfo) => boolean = function(){ return true; }
}
