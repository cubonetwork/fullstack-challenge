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
          backgroundColor: []
      }],

      labels: []
  };

  ngAfterViewInit(): void {
    let el = this._selector.nativeElement as HTMLCanvasElement;
    this.chart = new Chart(el.getContext('2d'), {
        type: 'doughnut',
        data: this.data,
        options: this.barChartOptions
    });
    this.employees.subscribe((data:Employee[])=>{
      this.data.datasets[0].data= data.map(employee=> employee.participation.toFixed(2));
      this.data.labels= data.map(employee=> { return employee.firstName + " "+ employee.lastName;});
      if(this.data.datasets[0].backgroundColor.length<=this.data.datasets[0].data.length){
        this.generateColors(this.data.datasets[0].data.length-this.data.datasets[0].backgroundColor.length);
      }
      this.chart.update();
    });
  }
  ngOnDestroy(): void {
    if(this.chart){
      this.chart.destroy();
    }
  }
  generateColors(n:number){
    for(let i =0; i< n;i++){
      this.data.datasets[0].backgroundColor.push(this.rgba());
    }
  }
  rgba():string {
    return 'rgb(' +this.getRandomInt(0,255) +','+this.getRandomInt(0,255)+','+this.getRandomInt(0,255)+')';
  }

  getRandomInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
