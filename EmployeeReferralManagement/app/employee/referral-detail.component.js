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
var common_1 = require('@angular/common');
var employee_service_1 = require('../services/employee.service');
var ReferralDetailComponent = (function () {
    function ReferralDetailComponent(route, _location, _router, employeeService) {
        this.route = route;
        this._location = _location;
        this._router = _router;
        this.employeeService = employeeService;
    }
    ReferralDetailComponent.prototype.ngOnInit = function () {
        this.employee = this.employeeService.getEmployee();
        this.candidateId = this.route.snapshot.params['id'];
        this.getCandidateDetails(this.candidateId);
    };
    ReferralDetailComponent.prototype.getCandidateDetails = function (candidateId) {
        var _this = this;
        this.employeeService.getCandidateDetails(candidateId).subscribe(function (data) { _this.candidate = data; }, function (err) { alert(err._body); });
    };
    ReferralDetailComponent.prototype.goBack = function () {
        this._location.back();
    };
    ReferralDetailComponent.prototype.downloadCandidateResume = function (candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/" + candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).subscribe((data) => {alert("Success");},(err)=>{})
    };
    ReferralDetailComponent.prototype.sendCallLetter = function (candidateId) {
        var _this = this;
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe(function (data) { _this._location.back(); }, function (err) { alert(err._body); });
    };
    ReferralDetailComponent.prototype.rejectCandidate = function (candidateId) {
        var _this = this;
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe(function (data) { _this._location.back(); }, function (err) { alert(err._body); });
    };
    ReferralDetailComponent = __decorate([
        core_1.Component({
            selector: 'referral-app',
            moduleId: module.id,
            templateUrl: 'referralDetail.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, common_1.Location, router_1.Router, employee_service_1.EmployeeService])
    ], ReferralDetailComponent);
    return ReferralDetailComponent;
}());
exports.ReferralDetailComponent = ReferralDetailComponent;
//# sourceMappingURL=referral-detail.component.js.map