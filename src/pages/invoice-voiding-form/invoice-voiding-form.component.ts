import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ApplicantInfoComponent, ApplicantInfoModel } from '../../parts/applicant-info/applicant-info.component';
import { Form } from '../../models/form.model';
import { TansitActionComponent } from '../../parts/tansit-action/tansit-action.component';
import { InvoiceVoiding } from '../../models/invoice-voiding.model';
import { SpinnerOverlayComponent } from '../../components/spinner-overlay/spinner-overlay.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlowInfo } from '../../models/flow-info.model';
import { FormInfo } from '../../models/form-Info.model';
import { catchError, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { ActionRecord } from '../../models/action-record.model';
import { Messages } from '../../models/messages.model';
import { DialogTransitActionComponent } from '../../components/dialog-transit-action/dialog-transit-action.component';
import { ApplicationInfoComponent, ApplicationInfoModel } from '../../parts/application-info/application-info.component';
import { InvoiceInfoModel, InvoiceInfoVoidingComponent } from '../../parts/invoice-info-voiding/invoice-info-voiding.component';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    ApplicantInfoComponent,
    TansitActionComponent,
    InvoiceInfoVoidingComponent,
    ApplicationInfoComponent,
    SpinnerOverlayComponent
  ],
  templateUrl: './invoice-voiding-form.html'
})
export class InvoiceVoidingFormComponent implements AfterViewInit {
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  form: Form<InvoiceVoiding> = new Form<InvoiceVoiding>();
  
  applicantInfoModel: ApplicantInfoModel = new ApplicantInfoModel();
  applicationInfoModel: ApplicationInfoModel = new ApplicationInfoModel();
  invoiceInfoModel: InvoiceInfoModel = new InvoiceInfoModel();

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.form.model = new InvoiceVoiding();
    this.form.flowInfo = new FlowInfo();
    this.form.formInfo = new FormInfo();
    this.form.actionRecords = [];

    this.spinnerOverlayComponent!.isOverlay = true;
    this.httpClient.post<any>(`./Api/InvoiceVoidingForm/FindFormBy`,
      { formId: this.getFormId() }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
        map(response => {
          var messages = response.messages as Messages;

          if (!messages.isValid){
            NotifyMessageComponent.popupBy(messages);
            return;
          }
            
          this.form.model = Object.assign<InvoiceVoiding, any>(this.form.model, response.form.model);
          this.form.flowInfo = Object.assign<FlowInfo, any>(new FlowInfo(), response.form.flowInfo);
          this.form.formInfo = Object.assign<FormInfo, any>(new FormInfo(), response.form.formInfo);
          this.form.actionRecords  = Object.assign<ActionRecord[], any[]>([], response.form.actionRecords); 

          this.applicantInfoModel = this.form?.model as ApplicantInfoModel;
          this.applicationInfoModel = this.form?.model as ApplicationInfoModel;
          this.invoiceInfoModel = this.form?.model as InvoiceInfoModel;
          
          this.spinnerOverlayComponent!.isOverlay = false;
        }),
        catchError((error: HttpErrorResponse) => {
          NotifyMessageComponent.popupBy(error);
          this.spinnerOverlayComponent!.isOverlay = false;
          return throwError(() => new Error(''));
        })
      ).subscribe();
  }

  transitAction(dialogTransitActionComponent: DialogTransitActionComponent, parameters: { [key: string]: string }){
    var transit = dialogTransitActionComponent.model.transit;
    var form = this.form;
    dialogTransitActionComponent.hideActionModal();

    this.spinnerOverlayComponent!.isOverlay = true;
    this.httpClient.post<any>(`./Api/InvoiceVoidingForm/TransitAction`,
      { transit: transit, form: form, parameters: parameters }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
        map(response => {
          this.spinnerOverlayComponent!.isOverlay = false;
          var messages = response.messages as Messages;

          if (!messages.isValid){
            NotifyMessageComponent.popupByDisplayTime(messages, 5000, 1000);
            return;
          }
            
          dialogTransitActionComponent.showCompletedModal();
        }),
        catchError((error: HttpErrorResponse) => {
          NotifyMessageComponent.popupBy(error);
          this.spinnerOverlayComponent!.isOverlay = false;
          return throwError(() => new Error(''));
        })
      ).subscribe();
  
  }

  getFormId(): string{
    return this.activatedRoute.snapshot.queryParams['formId'];
  }
}