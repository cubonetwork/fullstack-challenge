import { Observable } from 'rxjs/Rx';
import { Employee } from '../../employee.interface';
import {
    Component,
    ViewChild,
    Input,
    Output, 
    ElementRef,
    EventEmitter,
    OnDestroy,
    AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import * as Chart from 'chart.js';

declare var google:any;
declare var googleLoaded:any;
@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css'],
})
export class EmployeeChartComponent implements AfterViewInit, OnDestroy{

  @Input("employees") employees: Observable<Employee[]>;
  @ViewChild('searchGrid') _selector: ElementRef;
  public chart: any;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{
      position: 'bottom'
    }
  };

  data = {
    datasets: [{
          data: [],
          backgroundColor: ['rgba(121, 121, 255, 0.2)', 'rgba(255, 121, 121, 0.2)', 'rgba(255, 121, 121, 0.2)']
      }],

      labels: []
  };

  ngAfterViewInit(): void {
    let el = this._selector.nativeElement as HTMLCanvasElement;
    this.chart = new Chart(el.getContext('2d'), {
        type: 'doughnut',
        data: this.data,
        //options: this.barChartOptions
    });
    this.employees.subscribe((data:Employee[])=>{
      this.data.datasets[0].data= data.map(employee=> employee.participation);
      this.data.labels= data.map(employee=> { return employee.firstName + " "+ employee.lastName;});
      this.chart.update();
    });
  }
  ngOnDestroy(): void {
    if(this.chart){
      this.chart.destroy();
    }
  }



}
