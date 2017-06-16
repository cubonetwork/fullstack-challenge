import {
    Component,
    ViewChild,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    AfterViewInit
} from '@angular/core';

declare var google:any;
declare var googleLoaded:any;
@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css']
})
export class EmployeeChartComponent implements AfterViewInit {

  @ViewChild('searchGrid') _selector: ElementRef;
  private chart;

  constructor() { }

  ngAfterViewInit(): void {

    console.log(this._selector.nativeElement);
    google.charts.load('current', {'packages':['corechart']});
    setTimeout(() => this.draw(), 1000);
  }
  draw(){
      google.charts.setOnLoadCallback(drawChart);
      const element = this._selector.nativeElement;
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['Work',     11],
              ['Eat',      2],
              ['Commute',  2],
              ['Watch TV', 2],
              ['Sleep',    7]
            ]);

            var options = {
              title: 'My Daily Activities'
            };

            var chart = new google.visualization.PieChart(element);
            chart.draw(data, options);
        }
  }
  


}
