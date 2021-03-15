import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { ActionButton } from 'src/app/common/components/action-button/action-button';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { CofiCard } from './cofi-card';

describe('CoFiCard', () => {
  let component: CofiCard;
  let element: HTMLElement;
  let fixture: ComponentFixture<CofiCard>;

  let currentAccount: string;

  beforeEach(() => {
    currentAccount = '';
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [
        CofiCard,
        ActionButton,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CofiCard);
    component = fixture.componentInstance;
    component.isLoading = {};
    element = fixture.nativeElement;
  });

  it('should show approve button when not approved during depositing', () => {
    component.isApproved = false;
    component.isDeposit = true;
    fixture.detectChanges();
    expect(element.querySelector('#approve-btn')).not.toBeNull();
  });

  it('should not show approve button when approved during depositing', () => {
    component.isApproved = true;
    component.isDeposit = true;
    fixture.detectChanges();
    expect(element.querySelector('#approve-btn')).toBeNull();
  });

  it('should disable deposit button when not approved', () => {
    component.isApproved = false;
    component.isDeposit = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('#deposit-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable deposit button when no balance', () => {
    component.isApproved = true;
    component.isDeposit = true;
    component.balance = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('#deposit-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable deposit button when no enough balance', () => {
    component.isApproved = true;
    component.isDeposit = true;
    component.balance = '10';
    component.todoValue = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('#deposit-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable deposit button when a pending request', () => {
    component.isApproved = true;
    component.isDeposit = true;
    component.balance = '1';
    component.todoValue = '10';
    component.isLoading.cr = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('#deposit-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable deposit button when a valid amount', () => {
    component.isApproved = true;
    component.isDeposit = true;
    component.balance = '1';
    component.todoValue = '10';
    fixture.detectChanges();
    expect(
      (element.querySelector('#deposit-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should disable receive button when no balance', () => {
    component.isDeposit = false;
    component.balance = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable receive button when no enough balance', () => {
    component.isDeposit = false;
    component.balance = '10';
    component.hadValue = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable receive button when a pending request', () => {
    component.isDeposit = false;
    component.balance = '1';
    component.hadValue = '10';
    component.isLoading.qc = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable receive button when a valid amount', () => {
    component.isDeposit = false;
    component.balance = '1';
    component.hadValue = '10';
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });
});
