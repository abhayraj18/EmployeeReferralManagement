import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Employee } from '../models/employee';
import { Candidate } from '../models/candidate';

@Injectable()
export class EmployeeService {
    private employee : Employee;
    getEmployee(): Employee {
        return this.employee;
    };
    setEmployee(employee: Employee): void {
        this.employee = employee;
    };

    constructor(private http: Http){}
    
    getMyReferrals(pageNo, employeeId){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-my-referrals/'+pageNo+'/'+employeeId).map((response: Response) => response.json());
    }

    getAllReferrals(pageNo){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-all-referrals/'+pageNo).map((response: Response) => response.json());
    }

    addCandidate(candidate){
        return this.http.post('http://localhost:8080/EmployeeReferralManagement/rest/employee/add-candidate', candidate).toPromise()
        .then(res => res.text())
        .catch(this.handleError);
    }

    downloadCandidateResume(candidateId){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/'+candidateId).map((response: Response) => response.text());
    }

    sendCallLetter(candidateId, employeeId){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/send-call-letter/'+candidateId+'/'+employeeId).map((response: Response) => response.text);
    }

    rejectCandidate(candidateId, employeeId){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/reject/'+candidateId+'/'+employeeId).map((response: Response) => response.text);
    }

    getCandidateDetails(candidateId){
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-candidate-details/'+candidateId).map((response: Response) => response.json() as Candidate);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error._body);
        return Promise.reject(error._body || error);
    }
  
}