import { Employee } from '../../employees/employee.interface';
import { Action } from '@ngrx/store';

//Define actions types
export const LOAD_EMPLOYEE = "LOAD_EMPLOYEE";
export const LOAD_EMPLOYEE_COMPLETE = "LOAD_EMPLOYEE_COMPLETE";


export class LoadEmployee implements Action{
    readonly type: string = LOAD_EMPLOYEE;
    constructor(public payload?: string) { }
}

export class LoadEmployeeComplete implements Action{
    readonly type: string = LOAD_EMPLOYEE_COMPLETE;
    constructor(public payload: Employee[]) { }
}

export type Actions = LoadEmployeeComplete | LoadEmployee;