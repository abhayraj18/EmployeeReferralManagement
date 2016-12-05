import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ReferralResponse } from '../models/referral-response';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'referral-app',
    moduleId: module.id,
    templateUrl: 'getAllReferral.html'
}
)
export class AllReferralComponent{
    employee : Employee;
    referrals = new String();
    total = new Number();
    noOfPages = new Number();

    constructor(private _router: Router,private employeeService: EmployeeService) {}

    ngOnInit() {
        this.employee = this.employeeService.getEmployee();
        this.getAllReferrals(0); 
    }

    getAllReferrals(pageNo) {
        this.employeeService.getAllReferrals(pageNo).subscribe(
            (data) => {
                this.referrals = data.referrals;
                this.total = data.totalSize;
                this.noOfPages = Math.ceil(data.totalSize/10);
                }, 
            (err) => {alert(err._body)})
    }

    downloadCandidateResume(candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/"+candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).subscribe((data) => {alert("Success");},(err)=>{})
    }

    sendCallLetter(candidateId){
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe((data) => {this.getAllReferrals(0)},(err)=>{alert(err._body)})
    }

    rejectCandidate(candidateId){
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe((data) => {this.getAllReferrals(0)},(err)=>{alert(err._body)})
    }

    getNumber(num) {
		return new Array(num);   
	}

    showCandidateDetails(candidateId){
        this._router.navigate(['../home/referral', candidateId]);
    }

}