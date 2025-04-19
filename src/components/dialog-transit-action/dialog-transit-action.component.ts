import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transit } from '../../models/transit.model';
import { TransitType } from '../../models/enum/transit-type.enum';
import { Router } from '@angular/router';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';
import { FormType } from '../../models/enum/form-type.enum';
import { FormTypeUnity } from '../../models/form-type-unity.model';
import { FlowInfo } from '../../models/flow-info.model';

declare const $: any;

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SpinnerOverlayComponent
  ],
  selector: 'dialog-transit-action',
  templateUrl: './dialog-transit-action.html'
})
export class DialogTransitActionComponent {
  @Input() model: DialogTransitActionModel = new DialogTransitActionModel();

  @ViewChild('actionModal') actionModal!: ElementRef;
  @ViewChild('completedModal') completedModal!: ElementRef;
  @ViewChild(SpinnerOverlayComponent, { static: false }) spinnerOverlayComponent: SpinnerOverlayComponent | undefined;

  parameters: { [key: string]: string } = {};
  comment: string = "";

  constructor(private router: Router) { }

  action(): void {
    if (this.canEditComment()) {
      this.parameters['comment'] = this.comment;
    }
    this.model.actionEvent(this, this.parameters);
  }

  showActionModal(): void {
    $(this.actionModal.nativeElement).modal('show');
  }

  hideActionModal(): void {
    $(this.actionModal.nativeElement).modal('hide');
  }

  showCompletedModal(): void {
    $(this.completedModal.nativeElement).modal('show');
  }

  hideCompletedModal(): void {
    $(this.completedModal.nativeElement).modal('hide');
  }

  navigateToHome() {
    $(this.completedModal.nativeElement).modal('hide');
    this.router.navigateByUrl("/");
  }

  canEditComment(): boolean {
    return (this.model.transit.transitType == TransitType.Approve || this.model.transit.transitType == TransitType.Reject);
  }

  canReload(): boolean{
    return this.model.transit.transitType != TransitType.Invalid;
  }

  reload()
  {
    window.location.href =`${FormTypeUnity.getFormUrl(this.model.formType)}?formId=${this.model.formId}`;
  }

  getButtonClass(transit: Transit): string {
    var result = "btn-primary";

    if (transit.transitType == TransitType.Invalid ||
      transit.transitType == TransitType.Reject)
      result = "btn-danger";

    if (transit.transitType == TransitType.Submit)
      result = "btn-success";

    return result;
  }
}

export class DialogTransitActionModel {
  constructor() {  }

  update(
    flowInfo: FlowInfo, 
    formType: FormType, 
    transit: Transit, 
    actionEvent: (component: DialogTransitActionComponent, parameters: { [key: string]: string })=> void) { 
      this.formId = flowInfo.formId
      this.formType = formType;
      this.transit = transit;
      this.actionEvent = actionEvent;
  }

  formId: string = "";
  formType: FormType = FormType.None;
  transit: Transit = new Transit();
  actionEvent: (component: DialogTransitActionComponent, parameters: { [key: string]: string }) => void = function () { }
}