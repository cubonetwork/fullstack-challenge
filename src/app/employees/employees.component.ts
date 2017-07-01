import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  template: `
    <main>
    <new-employee></new-employee>
    <employee-report></employee-report></main>
  `,
})
export class EmployeesComponent implements OnInit {

  ngOnInit() {

  }
}
