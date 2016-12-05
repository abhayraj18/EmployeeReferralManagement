import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Employee } from '../_models/Employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  constructor(private http: Http){}

  logout() {
    return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/login/do-logout').toPromise()
    .then(res => {});
  }

  login(loginInfo){
    return this.http.post('http://localhost:8080/EmployeeReferralManagement/rest/login/do-login', loginInfo).toPromise()
    .then(res => res.json() as Employee)
    .catch(this.handleError);
  }

  getLoggedInUser(){
    return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/login/get-logged-in-employee').toPromise()
    .then(res => res.json() as Employee)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error._body);
    return Promise.reject(error._body || error);
  }
}