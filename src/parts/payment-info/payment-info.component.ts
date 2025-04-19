import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from '../../components/input-date/input-date.component';
import { FlowInfo } from '../../models/flow-info.model';
import { Option } from '../../models/option.model';
import { InputSelectComponent } from '../../components/input-select/input-select.component';
import { InputAutocompleteComponent } from '../../components/input-autocomplete/input-autocomplete.component';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PagingAssist } from '../../models/paging-assist.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NotifyMessageComponent } from '../../components/notify-message.component';

@Component({
  standalone: true,
  imports: [ 
    FormsModule,
    CommonModule,
    InputDateComponent,
    InputSelectComponent,
    InputAutocompleteComponent
  ],
  selector: 'payment-info',
  templateUrl: './payment-info.html'
})
export class PaymentInfoComponent {
  @Input() model!: PaymentInfoModel;
  @Input() flowInfo!: FlowInfo;

  constructor(private httpClient: HttpClient) { }

  getCustomerGroup(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5);

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchCustomerGroupBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.customerGroupName;
          option.value = item.customerGroupCode;
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

  getCustomer(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5)
      .set('customerGroupCode', this.model.customerGroupCode)

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchCustomerBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.customerName;
          option.value = item.customerCode;
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

  
  getInvoiceItem(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5);

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchInvoiceItemBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.invoiceItemDescription;
          option.value = item.invoiceItemCode;
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

export class PaymentInfoModel {
  invoiceDate: string = "";
  paymentMethod: Option[] = [];

  customerGroupCode: string = "";
  customerGroupName: string = "";

  customerCode: string = "";
  customerName: string = "";

  accountingDocumentType: Option[] = [];

  invoiceItemCode: string = "";
  invoiceItemDescription: string = "";

  isReadOnly: (field: string, flowInfo: FlowInfo) => boolean = function () { return true; }
}