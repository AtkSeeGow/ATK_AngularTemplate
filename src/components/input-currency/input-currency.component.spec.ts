import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCurrencyComponent } from './input-currency.component';
import { InputCurrencyDirective } from '../../directives/input-currency.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

@Component({
  template: `<input-currency [id]="id" [title]="title" [isReadOnly]="isReadOnly" [linkageEvent]="linkageEvent" [(inputValue)]="inputValue"></input-currency>`
})
class TestHostComponent {
  id = 'test-id';
  title = 'Test Title';
  isReadOnly = false;
  inputValue = 100;
  linkageEvent = (value: string) => { console.log(value); };
}

describe('InputCurrencyComponent', () => {
  let component: InputCurrencyComponent;
  let fixture: ComponentFixture<InputCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent ],
      imports: [ FormsModule, CommonModule, InputCurrencyComponent, InputCurrencyDirective ] // 將 InputCurrencyComponent 移到 imports 中
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // 測試組件是否正確創建
    expect(component).toBeTruthy();
  });

  it('should initialize @Input properties correctly', () => {
    // 設置 @Input 屬性並確認它們是否正確初始化
    component.id = 'test-id';
    component.title = 'Test Title';
    component.isReadOnly = true;
    component.inputValue = 200;

    expect(component.id).toBe('test-id');
    expect(component.title).toBe('Test Title');
    expect(component.isReadOnly).toBe(true);
    expect(component.inputValue).toBe(200);
  });

  it('should call renderer method in ngAfterViewInit', () => {
    // 確認在 ngAfterViewInit 中 renderer 方法是否被調用
    spyOn(component, 'renderer');
    component.ngAfterViewInit();

    expect(component.renderer).toHaveBeenCalled();
  });

  it('should update directive value in renderer method', () => {
    // 設置 inputCurrencyDirective 的 mock，檢查 renderer 方法是否正確更新 directive 的值並調用 onBlur 方法
    const directiveInstance = {
      el: { nativeElement: { value: '' } },
      onBlur: jasmine.createSpy('onBlur')
    } as unknown as InputCurrencyDirective;

    component.inputCurrencyDirective = directiveInstance;
    component.inputValue = 400;
    component.renderer();

    expect(directiveInstance.el.nativeElement.value).toBe('400');
    expect(directiveInstance.onBlur).toHaveBeenCalled();
  });

  it('should handle change event correctly', () => {
    // 模擬 change 事件，檢查 inputValue 和 inputValueChange 事件是否被正確更新和觸發
    spyOn(component.inputValueChange, 'emit');
    const event = { target: { valueAsNumber: 500 } } as any;

    component.change(event);

    expect(component.inputValue).toBe(500);
    expect(component.inputValueChange.emit).toHaveBeenCalledWith(500);
  });

  it('should call linkageEvent if defined', () => {
    // 確認 linkageEvent 是否被調用
    const linkageEventSpy = jasmine.createSpy('linkageEvent');
    component.linkageEvent = linkageEventSpy;
    component.id = 'test-id';
    const event = { target: { valueAsNumber: 600 } } as any;

    component.change(event);

    expect(linkageEventSpy).toHaveBeenCalledWith('test-id');
  });
});
