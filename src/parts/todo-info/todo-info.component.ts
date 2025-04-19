import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { TodoInfo } from '../../models/todo-indo.model';
import { PagingAssist } from '../../models/paging-assist.model';
import { FormUrlPipe } from '../../pipes/form-url-pipe';
import { SpinnerOverlayComponent } from '../../components/spinner-overlay/spinner-overlay.component';
import { PagerComponent, PagerModel } from '../../components/pager/pager.component';
import { PagerInfoComponent } from '../../components/pager/pager-info.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormUrlPipe,
    SpinnerOverlayComponent,
    PagerComponent,
    PagerInfoComponent
  ],
  selector: 'todo-info',
  templateUrl: './todo-info.html'
})
export class TodoInfoComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() processType!: number;

  @Input() showPager: boolean = false;
  @Input() onlyRecordCount: boolean = true;

  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  pagerModel: PagerModel = new PagerModel();

  pagingAssist: PagingAssist<TodoInfo> = new PagingAssist<TodoInfo>();

  constructor(private httpClient: HttpClient) {
    var component = this;
    this.pagerModel.pageSize = 5;
    this.pagerModel.clickHandler = function () { component.pageChange() }.bind(this);
  }

  ngAfterViewInit(): void {
  }

  pageChange() {
    const params = new HttpParams()
      .set('processType', this.processType)
      .set('currentIndex', this.pagerModel.currentPage - 1)
      .set('pageSize', this.pagerModel.pageSize);

    this.spinnerOverlayComponent!.isOverlay = true;
    this.httpClient.get<PagingAssist<TodoInfo>>(`./Api/Todo/FetchBy`, { params }).pipe(
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

  more(){
    window.location.href = `./TodoMore?processType=${this.processType}`;
  }
}