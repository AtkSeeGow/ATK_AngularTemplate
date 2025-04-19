import { AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Condition } from '../../models/condition.model';
import { InputDateComponent } from '../../components/input-date/input-date.component';
import { FormsModule } from '@angular/forms';
import { InputAutocompleteComponent } from '../../components/input-autocomplete/input-autocomplete.component';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Option } from '../../models/option.model';
import { PagingAssist } from '../../models/paging-assist.model';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { FormType } from '../../models/enum/form-type.enum';
import { ActivationStatus } from '../../models/enum/activation-status.enum';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputDateComponent,
    InputAutocompleteComponent
  ],
  selector: 'query-condition',
  templateUrl: './query-condition.html'
})
export class QueryConditionComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() condition!: Condition;
  @Input() queryEvent: () => void = function () { }

  FormType = FormType;
  ActivationStatus = ActivationStatus;

  constructor(private httpClient: HttpClient) { }

  ngAfterViewInit(): void {
  }

  query(){
    this.queryEvent();
  }

  getPerson(value: string): Observable<PagingAssist<Option>> {
    const params = new HttpParams()
      .set('condition', value)
      .set('currentIndex', 0)
      .set('pageSize', 5)

    return this.httpClient.get<PagingAssist<Option>>(`./Api/Common/GetPerson`, { params }).pipe(
      map((response: PagingAssist<any>) => {
        var pagingAssist = new PagingAssist<Option>();
        response.target.forEach(item => {
          const option = new Option();
          option.name = item.value;
          option.value = item.key;
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