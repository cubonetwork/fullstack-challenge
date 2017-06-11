import { Employee } from '../../employees/employee.interface';
import * as employeeActions from './employee.action';

export interface State {
    creating: boolean;
    created: boolean;
    employee: Employee;
};
const initialState: State = {
    creating: false,
    created: false,
    employee: {
        firstName: '',
        lastName: '',
        participation: '',
    }
};

export function reducer(state = initialState, action: employeeActions.Actions): State {
    switch (action.type) {
        case employeeActions.CREATE_EMPLOYEE: {
            return Object.assign({}, state, {
                creating: true,
                employee: action.payload
            });
        }
        case employeeActions.CREATE_EMPLOYEE_SUCCESS: {
            return Object.assign({}, state,{
                created: true,
                creating: false,
                employee: initialState.employee
            });
        }
        case employeeActions.CREATE_EMPLOYEE_FAILED: {
            return Object.assign({}, state,{
                created: false,
                creating: false,
                employee: initialState.employee
            });
        }
        default: {
            return state;
        }
    }
}

export const getCreatedStatus = (state: State) => state.created;
