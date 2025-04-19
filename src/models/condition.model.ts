import { ActivationStatus } from "./enum/activation-status.enum";
import { FormType } from "./enum/form-type.enum";

import moment from 'moment';

/**
 * 
 */
export class Condition {
  public formNumber: string = '';

  /**
   * 申請人單位代號
   */
  public applicantUnitId: string = '';

  /**
   * 申請人代號
   */
  public applicantPersonId: string = '';

  /**
   * 申請人單位名稱
   */
  public applicantUnitName: string = '';

  /**
   * 申請人名稱
   */
  public applicantPersonName: string = '';

  /**
   * 申請日期起
   */
  public beginApplicationDate: string = moment().subtract(3, 'months').format('YYYY-MM-DD');

  /**
   * 申請日期器
   */
  public endApplicationDate: string = moment().format('YYYY-MM-DD');

 /**
   * 經手人代號
   */
  public handlerPersonId: string = '';

   /**
   * 經手人名稱
   */
  public handlerPersonName: string = '';

  /**
   * 
   */
  public formStatus: ActivationStatus = ActivationStatus.None;

  /**
   * 
   */
  public formType: FormType = FormType.InvoiceApplicationForm;

  /**
   * 
   */
  public currentIndex: number | undefined;

  /**
   * 
   */
  public pageSize: number | undefined;
}




