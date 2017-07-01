import { Employee } from '../../employees/employee.interface';
import { Action } from "@ngrx/store";


export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const CREATE_EMPLOYEE_SUCCESS = "CREATE_EMPLOYEE_SUCCESS";
export const CREATE_EMPLOYEE_FAILED = "CREATE_EMPLOYEE_FAILED";

export class CreateEmployeeAction implements Action{
    readonly type: string = CREATE_EMPLOYEE;
    constructor(public payload: Employee) { }
}
export class CreateEmployeeSucessAction implements Action{
    readonly type: string = CREATE_EMPLOYEE_SUCCESS;
    constructor(public payload?: string) { }
}

export class CreateEmployeeFailedAction implements Action{
    readonly type: string = CREATE_EMPLOYEE_FAILED;
    constructor(public payload?: string) { }
}

export type Actions = CreateEmployeeAction | CreateEmployeeSucessAction | CreateEmployeeFailedAction;