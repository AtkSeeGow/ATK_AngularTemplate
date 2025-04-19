import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowInfo } from '../../models/flow-info.model';
import { PagingAssist } from '../../models/paging-assist.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Option } from '../../models/option.model';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { InputAutocompleteComponent } from '../../components/input-autocomplete/input-autocomplete.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    InputAutocompleteComponent
  ],
  selector: 'application-info',
  templateUrl: './application-info.html'
})
export class ApplicationInfoComponent {
  @Input() model!: ApplicationInfoModel;
  @Input() flowInfo!: FlowInfo;

  constructor(private httpClient: HttpClient) { }

  getBusinessType(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5);

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Autocomplete/FetchBusinessTypeBy`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.businessTypeName;
          option.value = item.businessTypeCode;
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

export class ApplicationInfoModel {
  applicationReason: string = "";

  businessTypeCode: string = "";
  businessTypeName: string = "";

  isReadOnly: (field: string, flowInfo: FlowInfo) => boolean = function () { return true; }
}