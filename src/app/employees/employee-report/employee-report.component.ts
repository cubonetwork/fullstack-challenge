import { Subscription } from 'rxjs/Rx';
import { getEmployees } from '../../redux';
import { LoadEmployee } from '../../redux/employeeCollection/employeeCollection.action';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../employee.interface';
import { State } from '../../redux';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit, OnDestroy {


  //employeesSubscription: Subscription;
  employees$: Observable<Employee[]>;
  constructor(private store: Store<State>) {
    //this.employeesSubscription = store.select(getEmployees).subscribe(data => console.log(data));
    this.employees$ = store.select(getEmployees);
  }

  ngOnInit() {
    this.store.dispatch(new LoadEmployee());
  }

  ngOnDestroy(): void {
    //this.employeesSubscription.unsubscribe();
  }

}
