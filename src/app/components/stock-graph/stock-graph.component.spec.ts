import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGraphComponent } from './stock-graph.component';

describe('StockGraphComponent', () => {
  let component: StockGraphComponent;
  let fixture: ComponentFixture<StockGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockGraphComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StockGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a graph', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('uplot')).toBeTruthy();
  });

  it('should update the graph when new data is provided', () => {
    const newData = [{ x: 1, y: 100 }, { x: 2, y: 150 }];
    component.data = newData;
    fixture.detectChanges();

    const updateSpy = spyOn(component, 'updateGraph');
    component.updateData(newData);
    expect(updateSpy).toHaveBeenCalledWith(newData);

    expect(component.uPlotInstance.data).toEqual(newData);
  });

  it('should initialize with the correct configuration', () => {

    const currentConfig = component.getCurrentConfig();

    expect(currentConfig.title).toEqual('Expected Title');
    expect(currentConfig.axes).toContain({

      label: 'X Axis',
      values: (u, vals, space) => vals.map(v => v.toFixed(2))
    });
  });

  it('should respond to zoom interaction', () => {

    const initialViewRange = component.uPlotInstance.scales.x.range;

    component.zoomGraph();

    const updatedViewRange = component.uPlotInstance.scales.x.range;
    expect(updatedViewRange).not.toEqual(initialViewRange);
  });

  it('should be visible in the DOM', () => {
    const graphElement = fixture.debugElement.query(By.css('.graph-container')).nativeElement;
    expect(graphElement.offsetWidth).toBeGreaterThan(0);
    expect(graphElement.offsetHeight).toBeGreaterThan(0);
  });
});
