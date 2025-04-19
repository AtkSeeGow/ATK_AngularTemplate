import { Directive, HostListener, ElementRef, Renderer2, AfterViewInit, Input  } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  standalone: true,
  selector: '[input-currency]',
  providers: [CurrencyPipe]
})
export class InputCurrencyDirective {
  @Input() decimalPlaces: number = 0;

  constructor(public el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    private currencyPipe: CurrencyPipe) { }

  @HostListener('focus') onFocus() {
    const value = this.el.nativeElement.value.replace(/[,$NT]/g, '');
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
    this.renderer.setAttribute(this.el.nativeElement, 'type', 'number');
  }

  @HostListener('blur') onBlur() {
    this.renderer.setAttribute(this.el.nativeElement, 'type', 'text');
    const value = parseFloat(this.el.nativeElement.value);
    if (isNaN(value)) {
      this.renderer.setProperty(this.el.nativeElement, 'value', '');
    } else {
      const digitsInfo = `1.${this.decimalPlaces}-${this.decimalPlaces}`;
      this.renderer.setProperty(this.el.nativeElement, 'value', this.currencyPipe.transform(value, 'TWD', 'symbol', digitsInfo));
    }
  }
}