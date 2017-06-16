import { Employee } from '../../employee.interface';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTableComponent implements OnInit {

  @Input("employees") employees: Employee[];
  constructor() { }

  ngOnInit() {
    //console.log(this.employees);
  }

}
