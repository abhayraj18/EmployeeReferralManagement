"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var employee_service_1 = require('../services/employee.service');
var candidate_1 = require('../models/candidate');
var employee_1 = require('../models/employee');
var AddReferralComponent = (function () {
    function AddReferralComponent(_router, employeeService, renderer) {
        this._router = _router;
        this.employeeService = employeeService;
        this.renderer = renderer;
        this.employee = new employee_1.Employee();
        this.experiences = ["Select Experience", "Fresher", "1-2 Years", "2-3 Years", "3-5 Years", "5-8 Years", "8-10 Years", ">10 Years"];
        this.candidate = new candidate_1.Candidate();
        this.resumeName = new String();
        this.formData = new FormData();
    }
    AddReferralComponent.prototype.ngOnInit = function () {
        this.employee = this.employeeService.getEmployee();
        this.candidate.experience = this.experiences[0];
    };
    AddReferralComponent.prototype.ngAfterViewInit = function () {
        this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
    };
    AddReferralComponent.prototype.addCandidate = function () {
        var _this = this;
        this.errorMessage = "";
        if (!this.candidate.name) {
            this.errorMessage = "Please fill candidate name";
            this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
            return;
        }
        if (!this.candidate.email) {
            this.errorMessage = "Please fill candidate email";
            this.renderer.invokeElementMethod(this.emailInput.nativeElement, 'focus');
            return;
        }
        if (!this.candidate.phone) {
            this.errorMessage = "Please fill candidate phone number";
            this.renderer.invokeElementMethod(this.phoneInput.nativeElement, 'focus');
            return;
        }
        if (!this.candidate.experience || this.candidate.experience == "Select Experience") {
            this.errorMessage = "Please select candidate's experience";
            this.renderer.invokeElementMethod(this.experienceInput.nativeElement, 'focus');
            return;
        }
        if (this.resumeName.length == 0) {
            this.errorMessage = "Please select candidate's resume";
            this.renderer.invokeElementMethod(this.resumeInput.nativeElement, 'focus');
            return;
        }
        this.candidate.referredBy = this.employee.employeeId;
        this.formData.append("candidate", JSON.stringify(this.candidate));
        this.employeeService.addCandidate(this.formData)
            .then(function (data) {
            alert(data);
            _this._router.navigate(['../home']);
        }, function (err) { _this.errorMessage = err; });
    };
    AddReferralComponent.prototype.onChange = function (experience) {
        this.candidate.experience = experience;
        if (experience == "Select Experience")
            this.errorMessage = "Please select candidate's experience";
        else
            this.errorMessage = "";
    };
    AddReferralComponent.prototype.onSelect = function (event) {
        var files = event.srcElement.files;
        for (var i = 0; i < files.length; i++) {
            this.formData.append("resume", files[i], files[i].name);
            this.resumeName = files[0].name;
        }
    };
    __decorate([
        core_1.ViewChild('name'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddReferralComponent.prototype, "nameInput", void 0);
    __decorate([
        core_1.ViewChild('email'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddReferralComponent.prototype, "emailInput", void 0);
    __decorate([
        core_1.ViewChild('phone'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddReferralComponent.prototype, "phoneInput", void 0);
    __decorate([
        core_1.ViewChild('experience'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddReferralComponent.prototype, "experienceInput", void 0);
    __decorate([
        core_1.ViewChild('resume'), 
        __metadata('design:type', core_1.ElementRef)
    ], AddReferralComponent.prototype, "resumeInput", void 0);
    AddReferralComponent = __decorate([
        core_1.Component({
            selector: 'referral-app',
            moduleId: module.id,
            templateUrl: 'addReferral.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, employee_service_1.EmployeeService, core_1.Renderer])
    ], AddReferralComponent);
    return AddReferralComponent;
}());
exports.AddReferralComponent = AddReferralComponent;
//# sourceMappingURL=add-referral.component.js.map