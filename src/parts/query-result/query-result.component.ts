import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { TodoInfo } from '../../models/todo-indo.model';
import { PagingAssist } from '../../models/paging-assist.model';
import { Condition } from '../../models/condition.model';
import { SpinnerOverlayComponent } from '../../components/spinner-overlay/spinner-overlay.component';
import { PagerComponent, PagerModel } from '../../components/pager/pager.component';
import { PagerInfoComponent } from '../../components/pager/pager-info.component';
import { FormUrlPipe } from '../../pipes/form-url-pipe';

@Component({
  standalone: true,
  imports: [ 
    CommonModule,
    SpinnerOverlayComponent,
    PagerComponent,
    PagerInfoComponent,
    FormUrlPipe
  ],
  selector: 'query-result',
  templateUrl: './query-result.html'
})
export class QueryResultComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() condition!: Condition;
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;
  
  pagerModel: PagerModel = new PagerModel();
  pagingAssist: PagingAssist<TodoInfo> = new PagingAssist<TodoInfo>();

  constructor(private httpClient: HttpClient) {  }
  
  ngAfterViewInit(): void {
    
  }

  pageChange() {
    this.httpClient.post<PagingAssist<TodoInfo>>(`./Api/Query/FetchBy`,
      this.condition,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        map(pagingAssist => {
          this.pagingAssist = pagingAssist;
          this.spinnerOverlayComponent!.isOverlay = false;
          this.pagerModel.recordCount = this.pagingAssist.recordsCount!;
        }),
        catchError((error: HttpErrorResponse) => {
          NotifyMessageComponent.popupBy(error);
          this.spinnerOverlayComponent!.isOverlay = false;
          return throwError(() => new Error(''));
        })
      ).subscribe();
  }
}