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
import { of } from 'rxjs/observable/of';
import * as employeeActions from './employee.action';
import * as employeeCollectionActions from '../employeeCollection/employeeCollection.action';

@Injectable()
export class EmployeeEffects{
    constructor(private EmployeeService: EmployeeService, private actions$: Actions) { }
    @Effect() 
    createEmployee$: Observable<Action>  = this.actions$
    .ofType(employeeActions.CREATE_EMPLOYEE)
    .map((action:employeeActions.CreateEmployeeAction) => action.payload)
    .mergeMap( employee => 
        this.EmployeeService.createEmployee(employee)
        .map(()=> new employeeActions.CreateEmployeeSucessAction())
        .catch((error) => {
            console.log(error);
            return of(new employeeActions.CreateEmployeeFailedAction())
        })
    );
    
    @Effect() 
    createSucessEmployee$: Observable<Action>  = this.actions$
    .ofType(employeeActions.CREATE_EMPLOYEE_SUCCESS)
    .switchMap(() => of(new employeeCollectionActions.LoadEmployee()));

}