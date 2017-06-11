import { createSelector } from 'reselect';
import * as fromEmployee from './employeeCollection/employeeCollection.reducer';

export interface State {
  employees: fromEmployee.State;
}

export const reducers = {
    employees: fromEmployee.reducer
}

export const getEmployeesState = (state: State) => state.employees;

export const getEmployees = createSelector(getEmployeesState, fromEmployee.getEmployees);
