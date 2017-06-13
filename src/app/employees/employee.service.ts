import { API_URL } from '../app.utils';
import { Employee } from './employee.interface';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
  private url: string;
  constructor(private http: Http) { 
    this.url = `${API_URL}/employees`;
  }
  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post(this.url, employee)
    .map(response => response.json() as Employee)
    //.catch(this.handleError);;
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get(this.url).map(response => response.json() as Employee[] || []);
  }
  // private handleError (error: Response | any):Observable<any> {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }


}
