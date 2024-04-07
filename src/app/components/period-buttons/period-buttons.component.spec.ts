import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodButtonsComponent } from './period-buttons.component';

describe('PeriodButtonsComponent', () => {
  let component: PeriodButtonsComponent;
  let fixture: ComponentFixture<PeriodButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodButtonsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "1D" as the default selected period', () => {
    expect(component.currentSelected).toBe('1D');
  });


});
