import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Employee } from '../_models/Employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrationService {

  constructor(private http: Http){}

  register(employee){
    return this.http.post('http://localhost:8080/EmployeeReferralManagement/rest/register/register-employee', employee).toPromise()
    .then(res => res.text())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error._body);
    return Promise.reject(error._body || error);
  }
}