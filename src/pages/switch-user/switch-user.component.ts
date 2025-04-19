import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Messages } from '../../models/messages.model';
import { catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './switch-user.html'
})
export class SwitchUserComponent implements AfterViewInit {
  constructor(private httpClient: HttpClient) { }

  personId: string = "";
  personName: string = "";

  ngAfterViewInit() {
  }

  switch(): void {
     this.httpClient.post<Messages>(`./Api/Authentication/SwitchUser`,
      { 
        personId: this.personId, personName: this.personName
      },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        map(messages => {
          if (messages.isValid)
            window.location.href = "./";

          NotifyMessageComponent.popupBy(messages);
        }),
        catchError((error: HttpErrorResponse) => {
          NotifyMessageComponent.popupBy(error);
          return throwError(() => new Error(''));
        })
      ).subscribe();
  }
}