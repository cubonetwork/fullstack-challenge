import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Response } from '@angular/http';
import Chart from 'chart.js';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    @ViewChild('chart') chartReference: ElementRef;

    employees: Employee[] = [];
    participationAvailable = 100;
    chart;
    colors = ['#2996dc', '#9b54b7', '#0db999', '#e84931'];

    constructor(private employeeService: EmployeeService) {
        employeeService.getEmployees()
            .subscribe(
                (response: Response) => {
                    const data = response.json();
                    let chartData = {
                        labels: [],
                        data: [],
                        colors: []
                    };

                    data.forEach(employee => {
                        const newEmployee = new Employee(employee.name, employee.lastName, employee.participation);
                        this.employees.push(newEmployee);
                        this.updateParticipation(newEmployee.participation);

                        chartData.labels.push(`${newEmployee.name} ${newEmployee.lastName}`);
                        chartData.data.push(newEmployee.participation);
                        chartData.colors.push(this.randomColor());
                    });

                    // Adds available data to chart
                    chartData.labels.unshift('Disponível');
                    chartData.data.unshift(this.participationAvailable);
                    chartData.colors.unshift('#eeeeee');

                    // Writes chart on screen
                    this.createChart(chartData);
                },
                (error) => console.error(error)
            );
    }

    onEmployeeAdded(employee: Employee) {
        this.employeeService.addEmployee(employee)
            .subscribe((response: Response) => console.log(response));

        this.employees.push(employee);
        this.updateParticipation(employee.participation);
        this.updateChart(employee);
    }

    /**
     * Adds the chart to the screen
     */
    private createChart(chartData) {
        const chartContext = this.chartReference.nativeElement.getContext('2d');

        this.chart = new Chart(
            chartContext,
            {
                type: 'doughnut',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            data: chartData.data,
                            backgroundColor: chartData.colors
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

    /**
     * Update the chart with employee data
     * @param employee The Employee data
     */
    private updateChart(employee: Employee) {
        // Adds a new employee data
        this.chart.data.labels.push(`${employee.name} ${employee.lastName}`);
        this.chart.data.datasets[0].data.push(employee.participation);
        this.chart.data.datasets[0].backgroundColor.push(this.randomColor());

        // Update available participation
        this.chart.data.datasets[0].data[0] = this.participationAvailable;

        // Update the chart
        this.chart.update();
    }

    /**
     * Adjust de maximum participation allowed
     * @param participation Amount that will removed from participation total
     */
    private updateParticipation(participation: number) {
        this.participationAvailable -= participation;
    }

    /**
     * Get a random color from colors array
     */
    private randomColor() {
        return this.colors[Math.floor(Math.random() * (this.colors.length))];
    }
}
