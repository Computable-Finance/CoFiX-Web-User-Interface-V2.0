import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowButton } from './arrow-button';

describe('ArrowButton', () => {
  let component: ArrowButton;
  let element: HTMLElement;
  let fixture: ComponentFixture<ArrowButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [ArrowButton],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowButton);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should work', () => {
    const image = element.querySelector('.select-img');
    let changedByEventEmmitter;

    component.arrowChanged.subscribe(
      (event) => (changedByEventEmmitter = event.isDown)
    );

    // init
    component.isDown = false;
    fixture.detectChanges();
    expect(image.getAttribute('src')).toContain('select_down');

    // click to change
    component.changeArrow();
    expect(component.isDown).toBe(true);
    expect(changedByEventEmmitter).toBe(true);
    fixture.detectChanges();
    expect(image.getAttribute('src')).toContain('select_up');

    // click again to reset
    component.changeArrow();
    expect(component.isDown).toBe(false);
    expect(changedByEventEmmitter).toBe(false);
    fixture.detectChanges();
    expect(image.getAttribute('src')).toContain('select_down');
  });
});
