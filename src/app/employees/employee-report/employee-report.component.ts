import { getEmployees } from '../redux';
import { LoadEmployee } from '../redux/employee.action';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee.interface';
import { State } from '../redux';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  employees$: Observable<Employee[]>;
  constructor(private store: Store<State>) { 
    this.employees$ = store.select(getEmployees);
  }

  ngOnInit() {
    this.store.dispatch(new LoadEmployee());
  }

}
