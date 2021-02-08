import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { CofiXService } from 'src/app/service/cofix.service';
import { BalanceTruncatePipe } from '../../pipes/balance.pipe';

import { ConnectModal } from './connect-modal';

describe('ConnectModal', () => {
  let component: ConnectModal;
  let element: HTMLElement;
  let fixture: ComponentFixture<ConnectModal>;
  let connected;
  let resultOfDismissed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(PopoverController, {
          dismiss: (data) => (resultOfDismissed = data.connected),
        }),
        MockProvider(CofiXService, {
          connectWallet: () => {
            connected = true;
            return Promise.resolve();
          },
          setConnectType: (type) => {},
          getCurrentContractAddressList: () => {
            return [];
          },
        }),
        MockProvider(BalanceTruncatePipe),
      ],
      declarations: [ConnectModal, MockPipe(TranslatePipe)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectModal);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should connect wallet when clicked, then set connected to true when dismissed', fakeAsync(async () => {
    fixture.detectChanges();

    await component.connect('metamask');
    tick(100);
    expect(connected).toEqual(true);
    expect(resultOfDismissed).toEqual(true);
  }));
});
