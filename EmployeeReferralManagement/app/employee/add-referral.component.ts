import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Candidate } from '../models/candidate';
import { Employee } from '../models/employee';

@Component({
    selector: 'referral-app',
    moduleId: module.id,
    templateUrl: 'addReferral.html'
}
)
export class AddReferralComponent implements OnInit, AfterViewInit {
    employee = new Employee();
    experiences = ["Select Experience", "Fresher", "1-2 Years", "2-3 Years", "3-5 Years", "5-8 Years", "8-10 Years", ">10 Years"];
    constructor(private _router: Router,
        private employeeService: EmployeeService, private renderer: Renderer) {}

    errorMessage : string;
    candidate = new Candidate();
    resumeName = new String();
    formData: FormData = new FormData();

    ngOnInit() {
        this.employee = this.employeeService.getEmployee();
        this.candidate.experience = this.experiences[0];
    }

    @ViewChild('name') nameInput: ElementRef;
    @ViewChild('email') emailInput: ElementRef;
    @ViewChild('phone') phoneInput: ElementRef;
    @ViewChild('experience') experienceInput: ElementRef;
    @ViewChild('resume') resumeInput: ElementRef;
    
    ngAfterViewInit() {            
        this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
    }

    addCandidate() {
        this.errorMessage = "";
        if(!this.candidate.name){
            this.errorMessage = "Please fill candidate name";
            this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
            return;
        }

        if(!this.candidate.email){
			this.errorMessage = "Please fill candidate email";
            this.renderer.invokeElementMethod(this.emailInput.nativeElement, 'focus');
			return;
		}

		if(!this.candidate.phone){
			this.errorMessage = "Please fill candidate phone number";
            this.renderer.invokeElementMethod(this.phoneInput.nativeElement, 'focus');
			return;
		}

		if(!this.candidate.experience || this.candidate.experience == "Select Experience"){
			this.errorMessage = "Please select candidate's experience";
            this.renderer.invokeElementMethod(this.experienceInput.nativeElement, 'focus');
			return;
		}

        if(this.resumeName.length == 0){
			this.errorMessage = "Please select candidate's resume";
            this.renderer.invokeElementMethod(this.resumeInput.nativeElement, 'focus');
			return;
		}
        
        this.candidate.referredBy = this.employee.employeeId;
        this.formData.append("candidate", JSON.stringify(this.candidate));
        this.employeeService.addCandidate(this.formData)
        .then(
            (data) => {
                alert(data);
                this._router.navigate(['../home'])
            }, 
            (err) => {this.errorMessage = err});
    }

    onChange(experience) {
        this.candidate.experience = experience;
        if(experience == "Select Experience")
			this.errorMessage = "Please select candidate's experience";
        else
            this.errorMessage = "";
    }

    onSelect(event) {
        var files = event.srcElement.files;
        for (let i = 0; i < files.length; i++) {
            this.formData.append("resume", files[i], files[i].name);
            this.resumeName = files[0].name;
        }
    }
}