import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserInfo } from '../../models/user-info.model';
import { catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { SpinnerOverlayComponent } from '../../components/spinner-overlay/spinner-overlay.component';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerOverlayComponent
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  isToggled: Boolean = false;
  userInfo: UserInfo | undefined

  constructor(private httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.spinnerOverlayComponent!.isOverlay = true;
    this.httpClient.get<UserInfo>(`./Api/Common/GetUserInfo`, { }).pipe(
      map(userInfo => {
        this.userInfo = userInfo;
        this.spinnerOverlayComponent!.isOverlay = false;
      }),
      catchError((error: HttpErrorResponse) => {
        NotifyMessageComponent.popupBy(error);
        this.spinnerOverlayComponent!.isOverlay = false;
        return throwError(() => new Error(''));
      })
    ).subscribe();
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }
}