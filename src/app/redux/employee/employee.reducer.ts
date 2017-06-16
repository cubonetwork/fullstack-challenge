import { Employee } from '../../employees/employee.interface';
import * as employeeActions from './employee.action';

export interface State {
    creating: boolean;
    created: boolean;
    failed: boolean;
    employee: Employee;
};
const initialState: State = {
    creating: false,
    created: false,
    failed: false,
    employee: {
        firstName: '',
        lastName: '',
        participation: 0
    }
};

export function reducer(state = initialState, action: employeeActions.Actions): State {
    switch (action.type) {
        case employeeActions.CREATE_EMPLOYEE: {
            return Object.assign({}, state, {
                creating: true,
                failed:false,
                created:false,
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
                failed: true,
                employee: initialState.employee
            });
        }
        default: {
            return state;
        }
    }
}

export const getCreatedStatus = (state: State) => state.created;
export const getStatus = (state: State) => {
    return {
        failed: state.failed,
        created: state.created,
        creating: state.creating
    }
};
