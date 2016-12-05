import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from './login-info';
import { LoginService } from '../services/login.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
    selector: 'login-app',
    templateUrl: '../app/login/login.html',
    providers: [LoginService]
}
)
export class LoginComponent implements AfterViewInit {
    constructor(private _router: Router,
        private loginService: LoginService, private employeeService: EmployeeService, private renderer: Renderer) {}
    
    errorMessage : string;
    employee = new Employee();

    @ViewChild('employeeId') employeeIdInput: ElementRef;
    @ViewChild('password') passwordInput: ElementRef;

    ngAfterViewInit() {            
        this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
    }

    public loginInfo = new LoginInfo('','');
    login() {
        if(!this.loginInfo.employeeId){
			//alert("Please fill Employee Id");
			this.errorMessage = "Please fill Employee Id";
            this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
			return;
		}
		if(!this.loginInfo.password){
			//alert("Please fill password");
			this.errorMessage = "Please fill password";
            this.renderer.invokeElementMethod(this.passwordInput.nativeElement, 'focus');
			return;
		}

        this.loginService.login(this.loginInfo)
        .then(
            (data) => {
                this.employee = data;
                this.employeeService.setEmployee(this.employee);
                this._router.navigate(['/home'])
            }, 
            (err) => {this.errorMessage = err});
    }
    
}