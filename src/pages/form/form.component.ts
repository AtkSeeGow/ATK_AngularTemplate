import { Component, AfterViewInit, AfterViewChecked, NgModule, OnInit, ViewChild } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ApplicantInfoComponent, ApplicantInfoModel } from '../../parts/applicant-info/applicant-info.component';
import { ApplicationInfoComponent, ApplicationInfoModel } from '../../parts/application-info/application-info.component';
import { Form } from '../../models/form.model';
import { TansitActionComponent } from '../../parts/tansit-action/tansit-action.component';
import { InvoiceApplication } from '../../models/invoice-application.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, throwError } from 'rxjs';
import { NotifyMessageComponent } from '../../components/notify-message.component';
import { Messages } from '../../models/messages.model';
import { InvoiceInfoComponent, InvoiceInfoModel } from '../../parts/invoice-info/invoice-info.component';
import { FlowInfo } from '../../models/flow-info.model';
import { IncomeInfoComponent, IncomeInfoModel } from '../../parts/income-info/income-info.component';
import { PaymentInfoComponent, PaymentInfoModel } from '../../parts/payment-info/payment-info.component';
import { ActivatedRoute } from '@angular/router';
import { DialogTransitActionComponent, DialogTransitActionModel } from '../../components/dialog-transit-action/dialog-transit-action.component';
import { FormInfo } from "../../models/form-Info.model";
import { ActionRecord } from '../../models/action-record.model';
import { SpinnerOverlayComponent } from '../../components/spinner-overlay/spinner-overlay.component';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    ApplicantInfoComponent,
    ApplicationInfoComponent,
    InvoiceInfoComponent,
    IncomeInfoComponent,
    PaymentInfoComponent,
    TansitActionComponent,
    SpinnerOverlayComponent
  ],
  templateUrl: './form.html'
})
export class FormComponent implements AfterViewInit {
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  form: Form<InvoiceApplication> = new Form<InvoiceApplication>();
  
  applicantInfoModel: ApplicantInfoModel = new ApplicantInfoModel();
  applicationInfoModel: ApplicationInfoModel = new ApplicationInfoModel();
  invoiceInfoModel: InvoiceInfoModel = new InvoiceInfoModel();
  incomeInfoModel: IncomeInfoModel = new IncomeInfoModel();
  paymentInfoModel: PaymentInfoModel = new PaymentInfoModel();

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.form.model = new InvoiceApplication();
    this.form.flowInfo = new FlowInfo();
    this.form.formInfo = new FormInfo();
    this.form.actionRecords = [];

    this.spinnerOverlayComponent!.isOverlay = true;
    this.httpClient.post<any>(`./Api/InvoiceApplicationForm/FindFormBy`,
      { formId: this.getFormId() }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
        map(response => {
          var messages = response.messages as Messages;

          if (!messages.isValid){
            NotifyMessageComponent.popupBy(messages);
            return;
          }
            
          this.form.model = Object.assign<InvoiceApplication, any>(this.form.model, response.form.model);
          this.form.flowInfo = Object.assign<FlowInfo, any>(new FlowInfo(), response.form.flowInfo);
          this.form.formInfo = Object.assign<FormInfo, any>(new FormInfo(), response.form.formInfo);
          this.form.actionRecords  = Object.assign<ActionRecord[], any[]>([], response.form.actionRecords); 

          this.applicantInfoModel = this.form?.model as ApplicantInfoModel;
          this.applicationInfoModel = this.form?.model as ApplicationInfoModel;
          this.invoiceInfoModel = this.form?.model as InvoiceInfoModel;
          this.incomeInfoModel = this.form?.model as IncomeInfoModel;
          this.paymentInfoModel = this.form?.model as PaymentInfoModel;

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
    this.httpClient.post<any>(`./Api/InvoiceApplicationForm/TransitAction`,
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