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
var MyReferralComponent = (function () {
    function MyReferralComponent(_router, employeeService) {
        this._router = _router;
        this.employeeService = employeeService;
        this.referrals = new String();
        this.total = new Number();
        this.noOfPages = new Number();
    }
    MyReferralComponent.prototype.ngOnInit = function () {
        this.employee = this.employeeService.getEmployee();
        this.getMyReferrals(0);
    };
    MyReferralComponent.prototype.getMyReferrals = function (pageNo) {
        var _this = this;
        this.employeeService.getMyReferrals(pageNo, this.employee.employeeId).subscribe(function (data) {
            _this.referrals = data.referrals;
            _this.total = data.totalSize;
            _this.noOfPages = Math.ceil(data.totalSize / 10);
        }, function (err) { });
    };
    MyReferralComponent.prototype.downloadCandidateResume = function (candidateId) {
        window.location.href = "http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/" + candidateId;
        //this.employeeService.downloadCandidateResume(candidateId).then((data) => {alert("Success");},(err)=>{alert("error")})
    };
    MyReferralComponent.prototype.sendCallLetter = function (candidateId) {
        var _this = this;
        this.employeeService.sendCallLetter(candidateId, this.employee.employeeId).subscribe(function (data) { _this.getMyReferrals(0); }, function (err) { alert(err._body); });
    };
    MyReferralComponent.prototype.rejectCandidate = function (candidateId) {
        var _this = this;
        this.employeeService.rejectCandidate(candidateId, this.employee.employeeId).subscribe(function (data) { _this.getMyReferrals(0); }, function (err) { alert(err._body); });
    };
    MyReferralComponent.prototype.getNumber = function (num) {
        return new Array(num);
    };
    MyReferralComponent.prototype.showCandidateDetails = function (candidateId) {
        this._router.navigate(['../home/referral', candidateId]);
    };
    MyReferralComponent = __decorate([
        core_1.Component({
            selector: 'referral-app',
            moduleId: module.id,
            templateUrl: 'getMyReferral.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, employee_service_1.EmployeeService])
    ], MyReferralComponent);
    return MyReferralComponent;
}());
exports.MyReferralComponent = MyReferralComponent;
//# sourceMappingURL=my-referral.component.js.map