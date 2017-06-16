import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChartComponent } from './employee-chart.component';

describe('EmployeeChartComponent', () => {
  let component: EmployeeChartComponent;
  let fixture: ComponentFixture<EmployeeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
