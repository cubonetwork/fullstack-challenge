import { CreateEmployeeAction } from '../../redux/employee/employee.action';
import { Subscription } from 'rxjs/Rx';
import { State, getEmployeeCreatedStatus } from '../../redux';
import { Employee } from '../employee.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  public employeeForm: FormGroup;
  public subscription: Subscription;
  constructor(private fb: FormBuilder, private store:Store<State>) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      participation: ['', [Validators.required]]
    });
    this.subscription = this.store.select(getEmployeeCreatedStatus).subscribe((data)=>console.log(data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public saveEmployee(employee: Employee){
    console.log(employee);
    this.store.dispatch(new CreateEmployeeAction(employee));
  }
}
