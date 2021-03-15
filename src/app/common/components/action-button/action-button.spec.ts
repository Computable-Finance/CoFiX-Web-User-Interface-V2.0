import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButton } from './action-button';

describe('ActionButton', () => {
  let component: ActionButton;
  let element: HTMLElement;
  let fixture: ComponentFixture<ActionButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [ActionButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButton);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });
});
