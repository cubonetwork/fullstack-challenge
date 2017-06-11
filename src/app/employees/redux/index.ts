import { Employee } from '../employee.interface';
import { createSelector } from 'reselect';
import * as fromEmployee from './employee.reducer';

export interface State {
  employees: fromEmployee.State;
}

export const reducers = {
    employees: fromEmployee.reducer
}

export const getEmployeesState = (state: State) => state.employees;

export const getEmployees = createSelector(getEmployeesState, fromEmployee.getEmployees);
