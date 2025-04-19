/**
 * 動作類型
 */
export enum TransitType {
  /**
   * 無
   */
  None,
  /**
   * 暫存
   */
  Save,
  /**
   * 送出
   */
  Submit,
  /**
   * 作廢
   */
  Invalid,
  /**
   * 核可
   */
  Approve,
  /**
   * 退出
   */
  Reject,
  /**
   * 向後加簽
   */
  AfterInsertState,
  /**
   * 結案
   */
  End,
  /**
   * 更換
   */
  Replace
}
