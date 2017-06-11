import { API_URL } from '../app.utils';
import { Employee } from './employee.interface';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
  private url: string;
  constructor(private http: Http) { 
    this.url = `${API_URL}/employees`;
  }
  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post(this.url, employee).map(response => response.json() as Employee);
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get(this.url).map(response => response.json() as Employee[]);
  }

}
