import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodButtonsComponent, PeriodChangeEvent } from './period-buttons.component';
import { By } from '@angular/platform-browser';

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
    const defaultButton = fixture.debugElement.query(By.css('button.bg-blue-500'));
    expect(defaultButton.nativeElement.textContent).toContain('1 day');
  });

  const periods = ['1D', '7D', '1M', '6M', 'YTD', '1Y', '5Y'];

  periods.forEach((period) => {
    it(`should update class to "bg-blue-500" for ${period} button upon selection`, () => {
      component.onPeriodSelect(period);
      fixture.detectChanges();
  
      const selectedButton = fixture.debugElement.query(By.css(`button.bg-blue-500`));
      let expectedButtonText = '';
  
      switch (period) {
        case '1D': expectedButtonText = '1 day'; break;
        case '7D': expectedButtonText = '7 days'; break;
        case '1M': expectedButtonText = '1 month'; break;
        case '6M': expectedButtonText = '6 months'; break;
        case 'YTD': expectedButtonText = 'YTD'; break;
        case '1Y': expectedButtonText = '1 year'; break;
        case '5Y': expectedButtonText = '5 years'; break;
        default: throw new Error(`Unhandled period: ${period}`);
      }
  
      expect(selectedButton.nativeElement.textContent.trim()).toContain(expectedButtonText);
    });
  });
});
