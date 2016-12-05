import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralResponse } from '../models/referral-response';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'referral-app',
    moduleId: module.id,
    templateUrl: 'employeeDetail.html'
}
)
export class DetailComponent implements OnInit {
    constructor(
        private _router: Router) {}
        
    ngOnInit() {
        this._router.navigate(['../home/getMyReferrals']);
    }
}