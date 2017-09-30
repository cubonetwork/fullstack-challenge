import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';

import { Employee } from './employee.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
    @ViewChild('chart') chartReference: ElementRef;

    employees: Employee[] = [];
    participationAvailable = 100;
    chart;
    colors = ['#2996dc', '#9b54b7', '#0db999', '#e84931'];

    ngOnInit() {
        const chartContext = this.chartReference.nativeElement.getContext('2d');
        this.chart = new Chart(
            chartContext,
            {
                type: 'doughnut',
                data: {
                    labels: ['Disponível'],
                    datasets: [
                        {
                            data: [this.participationAvailable],
                            backgroundColor: ['#bcc2c6']
                        }
                    ]
                },
                options: {
                    cutoutPercentage: 50,
                    responsive: true,
                    animation: {
                        animateScale: true,
                        animateRotate: false
                    }
                }
            }
        );
    }

    onEmployeeAdded(employee: Employee) {
        this.employees.push(employee);
        this.participationAvailable -= employee.participation;

        this.chart.data.labels.push(`${employee.name} ${employee.lastName}`);
        this.chart.data.datasets[0].data[0] = this.participationAvailable;
        this.chart.data.datasets[0].data.push(employee.participation);
        this.chart.data.datasets[0].backgroundColor.push(this.colors[Math.floor(Math.random() * (this.colors.length))]);
        this.chart.update();
    }
}
