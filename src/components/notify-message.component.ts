import { Messages } from "../models/messages.model";

declare const $: any;

export class NotifyMessageComponent {
  static popupBy(messages: any) {
    NotifyMessageComponent.popupByDisplayTime(messages, 0, 0);
  }

  static popupByDisplayTime(messages: any, displayTime: number, delayIncrement: number) {
    if (messages.errorMessages) {
      for (let key in messages.errorMessages){
        displayTime = displayTime + delayIncrement;
        $.notify({ icon: "tim-icons icon-bell-55", message: messages.errorMessages[key] }, { type: 'warning', delay: displayTime, placement: { from: 'top', align: 'right' } });
      }
    }

    if (messages.successMessages) {
      for (let key in messages.successMessages){
        displayTime = displayTime + delayIncrement;
        $.notify({ icon: "tim-icons icon-bell-55", message: messages.successMessages[key] }, { type: 'warning', delay: displayTime, placement: { from: 'top', align: 'right' } });
      }
    }

    if (messages.status) {
      $.notify({ icon: "tim-icons icon-bell-55", message: messages.statusText }, { type: 'warning', delay: displayTime, placement: { from: 'top', align: 'right' } });
    }
  }
}
