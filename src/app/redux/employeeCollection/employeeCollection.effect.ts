import { Employee } from '../../employees/employee.interface';
import { EmployeeService } from '../../employees/employee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as employeeActions from './employeeCollection.action';

@Injectable()
export class EmployeeEffects{
    constructor(private EmployeeService: EmployeeService, private actions$: Actions) { }
    @Effect() 
    loadEmployee$: Observable<Action>  = this.actions$
    .ofType(employeeActions.LOAD_EMPLOYEE)
 //   .mapTo((action:Action) => JSON.stringify(action.payload))
    .switchMap(() => this.EmployeeService
        .getAllEmployees()
        .map((employees:Employee[]) => { 
            return new employeeActions.LoadEmployeeComplete(employees)
        })
    );
}