import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Location } from '@angular/common';
import { ReferralResponse } from '../models/referral-response';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Candidate } from '../models/candidate';

@Component({
    selector: 'referral-app',
    moduleId: module.id,
    templateUrl: 'referralDetail.html'
}
)
export class ReferralDetailComponent implements OnInit {
    constructor(private route: ActivatedRoute, private _location: Location,
        private _router: Router, private employeeService: EmployeeService) {}
        
    employee : Employee;
    candidateId : string;
    candidate : Candidate;
    ngOnInit() {
        this.employee = this.employeeService.getEmployee();
        this.candidateId = this.route.snapshot.params['id'];
        this.getCandidateDetails(this.candidateId);
    }

    getCandidateDetails(candidateId){
         this.employeeService.getCandidateDetails(candidateId).subscribe((data) => {this.candidate = data;},(err)=>{alert(err._body)})
    }

    goBack() {
        this._location.back();
    }

    downloadCandidateResume(candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/"+candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).subscribe((data) => {alert("Success");},(err)=>{})
    }

    sendCallLetter(candidateId){
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe((data) => {this._location.back();},(err)=>{alert(err._body)})
    }

    rejectCandidate(candidateId){
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe((data) => {this._location.back();},(err)=>{alert(err._body)})
    }
}