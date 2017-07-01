import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromEmployeesCollection from './employeeCollection/employeeCollection.reducer';
import * as fromEmployee from './employee/employee.reducer';

export interface State {
  employees: fromEmployeesCollection.State;
  employee: fromEmployee.State
}

export const reducers = {
    employees: fromEmployeesCollection.reducer,
    employee: fromEmployee.reducer
}


const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return productionReducer(state, action);
}




export const getEmployeesState = (state: State) => state.employees;
export const getEmployeeState = (state: State) => state.employee;

export const getEmployees = createSelector(getEmployeesState, fromEmployeesCollection.getEmployees);
export const getEmployeeCreatedStatus = createSelector(getEmployeeState, fromEmployee.getCreatedStatus);
export const getEmployeeStatus = createSelector(getEmployeeState, fromEmployee.getStatus);

