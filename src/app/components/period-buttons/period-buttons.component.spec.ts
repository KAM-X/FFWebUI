import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeriodButtonsComponent } from './period-buttons.component';

describe('PeriodButtonsComponent', () => {
  let component: PeriodButtonsComponent;
  let fixture: ComponentFixture<PeriodButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodButtonsComponent],
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

  const periods = ['1D', '7D', '1M', '6M', 'YTD', '1Y', '5Y'];

  periods.forEach((period) => {
    it(`should emit correct start and end dates when the ${period} button is clicked`, () => {
      spyOn(component.periodChange, 'emit');
      const now = new Date();
      jasmine.clock().install();
      jasmine.clock().mockDate(now);

      component.onPeriodSelect(period);

      let expectedStartDatetime = new Date();
      let expectedEndDatetime = new Date();

      expectedEndDatetime.setHours(23, 59, 59, 999);
      expectedStartDatetime = new Date(expectedEndDatetime.getTime());

      switch (period) {
        case '1D':
          expectedStartDatetime.setDate(now.getDate() - 1);
          break;
        case '7D':
          expectedStartDatetime.setDate(now.getDate() - 7);
          break;
        case '1M':
          expectedStartDatetime.setMonth(now.getMonth() - 1);
          break;
        case '6M':
          expectedStartDatetime.setMonth(now.getMonth() - 6);
          break;
        case 'YTD':
          expectedStartDatetime = new Date(now.getFullYear(), 0, 1);
          break;
        case '1Y':
          expectedStartDatetime.setFullYear(now.getFullYear() - 1);
          break;
        case '5Y':
          expectedStartDatetime.setFullYear(now.getFullYear() - 5);
          break;
      }

      expect(component.periodChange.emit).toHaveBeenCalledWith({
        startDatetime: new Date(expectedStartDatetime.getTime()),
        endDatetime: new Date(expectedEndDatetime.getTime()),
      });

      jasmine.clock().uninstall();
    });
  });
});
