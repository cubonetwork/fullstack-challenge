import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from './employee.model';

import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

    constructor(private http:Http) { } 

    private buildRequestHeaders():Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    getEmployees(): Observable<Employee[]> {
        return this.http
            .get(`${environment.api_url}/employees`, { headers: this.buildRequestHeaders() })
            .map(res => res.json());
    }

    add(employee:Employee):Observable<Response> {
        let requestBody = JSON.stringify({
            nome: employee.nome,
            sobrenome: employee.sobrenome,
            participacao: employee.participacao
        });

        return this.http
            .post(`${environment.api_url}/employees`, requestBody, { headers: this.buildRequestHeaders() });
    }
}