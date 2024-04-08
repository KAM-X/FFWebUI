import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLegendComponent } from './stock-legend.component';

describe('StockLegendComponent', () => {
  let component: StockLegendComponent;
  let fixture: ComponentFixture<StockLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockLegendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
