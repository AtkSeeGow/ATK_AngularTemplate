import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ FormsModule],
  selector: 'applicant-info',
  templateUrl: './applicant-info.html'
})
export class ApplicantInfoComponent {
  @Input() model!: ApplicantInfoModel;
  
  constructor() { }
}

export class ApplicantInfoModel{
  formNumber: string | undefined;
  applicationDate: string | null | undefined;
  applicantUnitName: string | undefined;
  applicantPersontName: string | undefined;
}