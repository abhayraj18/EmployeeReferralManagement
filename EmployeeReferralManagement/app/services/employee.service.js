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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
    }
    EmployeeService.prototype.getEmployee = function () {
        return this.employee;
    };
    ;
    EmployeeService.prototype.setEmployee = function (employee) {
        this.employee = employee;
    };
    ;
    EmployeeService.prototype.getMyReferrals = function (pageNo, employeeId) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-my-referrals/' + pageNo + '/' + employeeId).map(function (response) { return response.json(); });
    };
    EmployeeService.prototype.getAllReferrals = function (pageNo) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-all-referrals/' + pageNo).map(function (response) { return response.json(); });
    };
    EmployeeService.prototype.addCandidate = function (candidate) {
        return this.http.post('http://localhost:8080/EmployeeReferralManagement/rest/employee/add-candidate', candidate).toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    EmployeeService.prototype.downloadCandidateResume = function (candidateId) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/download-candidate-resume/' + candidateId).map(function (response) { return response.text(); });
    };
    EmployeeService.prototype.sendCallLetter = function (candidateId, employeeId) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/send-call-letter/' + candidateId + '/' + employeeId).map(function (response) { return response.text; });
    };
    EmployeeService.prototype.rejectCandidate = function (candidateId, employeeId) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/reject/' + candidateId + '/' + employeeId).map(function (response) { return response.text; });
    };
    EmployeeService.prototype.getCandidateDetails = function (candidateId) {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/employee/get-candidate-details/' + candidateId).map(function (response) { return response.json(); });
    };
    EmployeeService.prototype.handleError = function (error) {
        console.error('An error occurred', error._body);
        return Promise.reject(error._body || error);
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map