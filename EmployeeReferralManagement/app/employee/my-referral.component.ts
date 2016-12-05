import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralResponse } from '../models/referral-response';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'referral-app',
    moduleId: module.id,
    templateUrl: 'getMyReferral.html'
}
)
export class MyReferralComponent  implements OnInit {
    employee : Employee;
    referrals = new String();
    total = new Number();
    noOfPages = new Number();

    constructor(private _router: Router,private employeeService: EmployeeService) {}

    ngOnInit() {
        this.employee = this.employeeService.getEmployee();
        this.getMyReferrals(0); 
    }

    getMyReferrals(pageNo) {
        this.employeeService.getMyReferrals(pageNo, this.employee.employeeId).subscribe(
            (data) => {
                this.referrals = data.referrals;
                this.total = data.totalSize;
                this.noOfPages = Math.ceil(data.totalSize/10);
                }, 
            (err) => {})
    }

    downloadCandidateResume(candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/"+candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).then((data) => {alert("Success");},(err)=>{alert("error")})
    }

    sendCallLetter(candidateId){
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe((data) => {this.getMyReferrals(0)},(err)=>{alert(err._body)})
    }

    rejectCandidate(candidateId){
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe((data) => {this.getMyReferrals(0)},(err)=>{alert(err._body)})
    }

    getNumber(num) {
		return new Array(num);   
	}

    showCandidateDetails(candidateId){
        this._router.navigate(['../home/referral', candidateId]);
    }
}