import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'home-app',
    moduleId: module.id,
    templateUrl: 'home.html'
})

export class HomeComponent implements OnInit {
    employeeId : string;
    designation : string;
    employee = new Employee();
    constructor(private loginService: LoginService,
        private _router: Router, private employeeService: EmployeeService) {}

    ngOnInit() {
        this.employee = this.employeeService.getEmployee();
        //this.getLoggedInUser();
    }

    private getLoggedInUser() {
        this.loginService.getLoggedInUser().then(
            (data) => {this.employee = data; this.employeeService.setEmployee(this.employee);}, 
            (err) => {this._router.navigate(['./login'])});
    }

    logout(){
        this.loginService.logout().then((data) => {});
        this._router.navigate(['./login']);
    }
}