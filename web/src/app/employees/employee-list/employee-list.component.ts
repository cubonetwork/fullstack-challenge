import { Component, Input } from '@angular/core';
import { Employee } from '../shared/employee.model';

@Component({
    moduleId: module.id,
    selector: 'employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

    @Input() employees:Employee[] = [];

}