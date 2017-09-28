import { Component, OnInit } from '@angular/core';
import { Employee } from './employees/shared/employee.model'
import { EmployeeService } from './employees/shared/employee.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    employees:Employee[] = [];
    
    constructor(private employeeService:EmployeeService) { }

    ngOnInit() {
      this.updateEmployeesData();
    }

    updateEmployeesData() {
      this.employeeService
          .getEmployees()
          .subscribe(employees => {
              this.employees = employees;
          }, error => console.log(error));
    }

    onEmployeeCreated(event) {
        this.updateEmployeesData();
    }

}
