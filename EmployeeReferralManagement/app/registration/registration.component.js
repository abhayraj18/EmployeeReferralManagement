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
var registration_service_1 = require('../services/registration.service');
var employee_1 = require('../models/employee');
var RegistrationComponent = (function () {
    function RegistrationComponent(_router, registrationService, renderer) {
        this._router = _router;
        this.registrationService = registrationService;
        this.renderer = renderer;
        this.designations = ["Select Designation", "Project Trainee", "Software Engineer", "Senior Software Engineer", "Technical Lead", "Project Manager", "HR"];
        this.employee = new employee_1.Employee();
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.employee.designation = this.designations[0];
    };
    RegistrationComponent.prototype.ngAfterViewInit = function () {
        this.renderer.invokeElementMethod(this.nameInput.nativeElement, 'focus');
    };
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        if (!this.employee.name) {
            this.errorMessage = "Please fill name";
            return;
        }
        if (!this.employee.employeeId) {
            this.errorMessage = "Please fill Employee Id";
            this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
            return;
        }
        if (!this.employee.password) {
            this.errorMessage = "Please fill password";
            this.renderer.invokeElementMethod(this.passwordInput.nativeElement, 'focus');
            return;
        }
        if (!this.employee.email) {
            this.errorMessage = "Please fill email id";
            this.renderer.invokeElementMethod(this.emailInput.nativeElement, 'focus');
            return;
        }
        if (!this.employee.designation || this.employee.designation == "Select Designation") {
            this.errorMessage = "Please select your designation";
            this.renderer.invokeElementMethod(this.designationInput.nativeElement, 'focus');
            return;
        }
        this.registrationService.register(this.employee).then(function (data) {
            alert(data);
            _this._router.navigate(['/login']);
        }, function (err) { _this.errorMessage = err; });
    };
    RegistrationComponent.prototype.onChange = function (designation) {
        this.employee.designation = designation;
        if (designation == "Select Designation")
            this.errorMessage = "Please select your designation";
        else
            this.errorMessage = "";
    };
    __decorate([
        core_1.ViewChild('name'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationComponent.prototype, "nameInput", void 0);
    __decorate([
        core_1.ViewChild('employeeId'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationComponent.prototype, "employeeIdInput", void 0);
    __decorate([
        core_1.ViewChild('password'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationComponent.prototype, "passwordInput", void 0);
    __decorate([
        core_1.ViewChild('designation'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationComponent.prototype, "designationInput", void 0);
    __decorate([
        core_1.ViewChild('email'), 
        __metadata('design:type', core_1.ElementRef)
    ], RegistrationComponent.prototype, "emailInput", void 0);
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'registration-app',
            templateUrl: '../app/registration/registration.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, registration_service_1.RegistrationService, core_1.Renderer])
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map