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
var AllReferralComponent = (function () {
    function AllReferralComponent(_router, employeeService) {
        this._router = _router;
        this.employeeService = employeeService;
        this.referrals = new String();
        this.total = new Number();
        this.noOfPages = new Number();
    }
    AllReferralComponent.prototype.ngOnInit = function () {
        this.employee = this.employeeService.getEmployee();
        this.getAllReferrals(0);
    };
    AllReferralComponent.prototype.getAllReferrals = function (pageNo) {
        var _this = this;
        this.employeeService.getAllReferrals(pageNo).subscribe(function (data) {
            _this.referrals = data.referrals;
            _this.total = data.totalSize;
            _this.noOfPages = Math.ceil(data.totalSize / 10);
        }, function (err) { alert(err._body); });
    };
    AllReferralComponent.prototype.downloadCandidateResume = function (candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/" + candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).subscribe((data) => {alert("Success");},(err)=>{})
    };
    AllReferralComponent.prototype.sendCallLetter = function (candidateId) {
        var _this = this;
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe(function (data) { _this.getAllReferrals(0); }, function (err) { alert(err._body); });
    };
    AllReferralComponent.prototype.rejectCandidate = function (candidateId) {
        var _this = this;
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe(function (data) { _this.getAllReferrals(0); }, function (err) { alert(err._body); });
    };
    AllReferralComponent.prototype.getNumber = function (num) {
        return new Array(num);
    };
    AllReferralComponent.prototype.showCandidateDetails = function (candidateId) {
        this._router.navigate(['../home/referral', candidateId]);
    };
    AllReferralComponent = __decorate([
        core_1.Component({
            selector: 'referral-app',
            moduleId: module.id,
            templateUrl: 'getAllReferral.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, employee_service_1.EmployeeService])
    ], AllReferralComponent);
    return AllReferralComponent;
}());
exports.AllReferralComponent = AllReferralComponent;
//# sourceMappingURL=all-referral.component.js.map