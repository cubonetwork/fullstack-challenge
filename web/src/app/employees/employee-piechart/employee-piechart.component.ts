import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../shared/employee.model'

@Component({
    moduleId: module.id,
    selector: 'employee-piechart',
    templateUrl: './employee-piechart.component.html',
    styleUrls: ['./employee-piechart.component.css']
})
export class EmployeePieChartComponent implements OnChanges {

    @Input() employees:Employee[] = [];
    
    data:Object[] = [];

    options:Object = {
        chart: {
            type: 'pieChart',
            donut: true,
            height: 350,
            noData: '',
            x: d => { return d.key; },
            y: d => { return d.y; },
            showLabels: false,
            legendPosition: 'top'
        }
    };
    
    ngOnChanges(changes: SimpleChanges) {
        this.data = [];
        this.employees.forEach(employee => {
            this.data.push({
                key: employee.nome,
                y: employee.participacao
            });
        });

    }
}