import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { LANG_ITEMS } from 'src/app/common/constants';
import { SettingsQuery } from 'src/app/state/setting/settings.query';
import { SettingsService } from 'src/app/state/setting/settings.service';

import { MenuPage } from './menu.page';

describe('MenuPage', () => {
  let component: MenuPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<MenuPage>;

  const useSpy = jasmine.createSpy();
  const dismissSpy = jasmine.createSpy();
  const updateLangSpy = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(PopoverController, {
          dismiss: dismissSpy,
        }),
        MockProvider(TranslateService, {
          use: useSpy,
        }),
        MockProvider(SettingsQuery, {
          lang: () => 'en',
        }),
        MockProvider(SettingsService, {
          updateLang: updateLangSpy,
        }),
      ],
      declarations: [MenuPage, MockPipe(TranslatePipe)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should switch lang and update settings when lang is changed', () => {
    component.changeLang('zh');
    expect(useSpy).toHaveBeenCalledWith('zh');
    expect(updateLangSpy).toHaveBeenCalledWith('zh');
  });

  it('should call dismiss after switching lang, if menu is created by lang button', fakeAsync(async () => {
    component.style = 'pop';
    await component.changeLang('zh');
    tick(1000);
    expect(dismissSpy).toHaveBeenCalled();
  }));

  it('should emit event after switching lang, if menu is not created by lang button', fakeAsync(async () => {
    let langChanged = false;
    component.langChange.subscribe(() => (langChanged = true));
    await component.changeLang('zh');
    tick(1000);
    expect(langChanged).toEqual(true);
  }));

  it('should show all languages', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.ion-button-label').length).toEqual(
      LANG_ITEMS.length
    );
  });
});
