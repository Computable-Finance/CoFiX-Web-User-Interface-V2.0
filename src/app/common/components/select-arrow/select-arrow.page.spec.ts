import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectArrowPage } from './select-arrow.page';

describe('ArrowButton', () => {
  let component: SelectArrowPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<SelectArrowPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [SelectArrowPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectArrowPage);
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
