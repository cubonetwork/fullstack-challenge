import { Employee } from '../../employees/employee.interface';
import * as employeeActions from './employeeCollection.action';

export interface State {
    loaded: boolean;
    loading: boolean;
    employees: Employee[];
};
const initialState: State = {
    loaded: false,
    loading: false,
    employees: []
};

export function reducer(state = initialState, action: employeeActions.Actions): State {
    switch (action.type) {
        case employeeActions.LOAD_EMPLOYEE: {
            return Object.assign({}, state, {
            loading: true
            });
        }
        case employeeActions.LOAD_EMPLOYEE_COMPLETE: {
            return Object.assign({}, state,{
                loaded: true,
                loading: false,
                employees: action.payload
            });
        }
        default: {
            return state;
        }
    }
}

export const getEmployees = (state: State) => state.employees;
