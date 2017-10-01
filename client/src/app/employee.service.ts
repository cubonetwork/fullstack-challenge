import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
    domain = 'http://localhost:3000';

    constructor(private http: Http) { }

    getEmployees() {
        return this.http.get(`${this.domain}/employees`);
    }

    addEmployee(employee: Employee) {
        return this.http.post(`${this.domain}/employees`, employee);
    }
}
