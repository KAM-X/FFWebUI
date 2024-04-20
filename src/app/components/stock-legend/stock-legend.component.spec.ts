import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockLegendComponent } from './stock-legend.component';

describe('StockLegendComponent', () => {
  let component: StockLegendComponent;
  let fixture: ComponentFixture<StockLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockLegendComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    component['stock1Name'] = 'NVIDIA';
    component['stock1Data1'] = '-280$(-1.44%) Past day';
    component['stock1Data2'] = 'Market open: 2024-04-08';

    component['stock2Name'] = 'AMD';
    component['stock2Data1'] = '+190$(+2.44%) Past day';
    component['stock2Data2'] = 'Market open: 2024-04-08';

    expect(component.stock1Name).toBe('NVIDIA');
    expect(component.stock1Data1).toBe('-280$(-1.44%) Past day');
    expect(component.stock1Data2).toBe('Market open: 2024-04-08');

    expect(component.stock2Name).toBe('AMD');
    expect(component.stock2Data1).toBe('+190$(+2.44%) Past day');
    expect(component.stock2Data2).toBe('Market open: 2024-04-08');
  });
});
