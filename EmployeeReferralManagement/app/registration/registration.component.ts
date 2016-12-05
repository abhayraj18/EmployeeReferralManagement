import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { Employee } from '../models/employee';

@Component({
    selector: 'registration-app',
    templateUrl: '../app/registration/registration.html',
}
)
export class RegistrationComponent implements OnInit, AfterViewInit {
    designations = ["Select Designation", "Project Trainee", "Software Engineer", "Senior Software Engineer", "Technical Lead", "Project Manager", "HR"];
    constructor(private _router: Router,
        private registrationService: RegistrationService, private renderer: Renderer) {}

    errorMessage : string;
    employee = new Employee();
    
    ngOnInit() {
        this.employee.designation = this.designations[0];
    }

    @ViewChild('name') nameInput: ElementRef;
    @ViewChild('employeeId') employeeIdInput: ElementRef;
    @ViewChild('password') passwordInput: ElementRef;
    @ViewChild('designation') designationInput: ElementRef;
    @ViewChild('email') emailInput: ElementRef;

    ngAfterViewInit() {            
        this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
    }

    register() {
        if(!this.employee.name){
            this.errorMessage = "Please fill name";
            return;
        }

        if(!this.employee.employeeId){
			this.errorMessage = "Please fill Employee Id";
            this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
			return;
		}

		if(!this.employee.password){
			this.errorMessage = "Please fill password";
            this.renderer.invokeElementMethod(this.passwordInput.nativeElement, 'focus');
			return;
		}

        if(!this.employee.email){
			this.errorMessage = "Please fill email id";
            this.renderer.invokeElementMethod(this.emailInput.nativeElement, 'focus');
			return;
		}

		if(!this.employee.designation || this.employee.designation == "Select Designation"){
			this.errorMessage = "Please select your designation";
            this.renderer.invokeElementMethod(this.designationInput.nativeElement, 'focus');
			return;
		}

        this.registrationService.register(this.employee).then(
            (data) => {
                alert(data);
                this._router.navigate(['/login'])
            }, 
            (err) => {this.errorMessage = err});
    }

    onChange(designation) {
        this.employee.designation = designation;
        if(designation == "Select Designation")
			this.errorMessage = "Please select your designation";
        else
            this.errorMessage = "";
    }
}