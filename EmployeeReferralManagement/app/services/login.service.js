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
require('rxjs/add/operator/toPromise');
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.logout = function () {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/login/do-logout').toPromise()
            .then(function (res) { });
    };
    LoginService.prototype.login = function (loginInfo) {
        return this.http.post('http://localhost:8080/EmployeeReferralManagement/rest/login/do-login', loginInfo).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.getLoggedInUser = function () {
        return this.http.get('http://localhost:8080/EmployeeReferralManagement/rest/login/get-logged-in-employee').toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.handleError = function (error) {
        console.error('An error occurred', error._body);
        return Promise.reject(error._body || error);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map