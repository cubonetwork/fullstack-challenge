import { CreateEmployeeAction } from '../../redux/employee/employee.action';
import { Subscription } from 'rxjs/Rx';
import { State, getEmployeeStatus } from '../../redux';
import { Employee } from '../employee.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

interface Status{
  created: boolean;
  creating: boolean;
  failed: boolean;
}

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
    this.subscription = this.store.select(getEmployeeStatus)
    .subscribe((data: Status)=>{
      if(data.creating==false && data.failed==true){
        console.log('error');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public saveEmployee(employee: Employee){
    console.log(employee);
    this.store.dispatch(new CreateEmployeeAction(employee));
  }
}
