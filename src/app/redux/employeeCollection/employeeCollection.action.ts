import { Employee } from '../../employees/employee.interface';
import { Action } from '@ngrx/store';

//Define actions types
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const LOAD_EMPLOYEE = "CREATE_EMPLOYEE";
export const LOAD_EMPLOYEE_COMPLETE = "LOAD_EMPLOYEE_COMPLETE";



export class CreateEmployeeAction implements Action{
    readonly type: string = CREATE_EMPLOYEE;
    constructor(public payload: Employee) { }
}

export class LoadEmployee implements Action{
    readonly type: string = LOAD_EMPLOYEE;
}

export class LoadEmployeeComplete implements Action{
    readonly type: string = LOAD_EMPLOYEE_COMPLETE;
    constructor(public payload: Employee[]) { }
}

export type Actions
  = CreateEmployeeAction | LoadEmployeeComplete