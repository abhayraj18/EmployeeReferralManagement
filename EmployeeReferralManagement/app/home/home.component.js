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
var login_service_1 = require('../services/login.service');
var employee_1 = require('../models/employee');
var employee_service_1 = require('../services/employee.service');
var HomeComponent = (function () {
    function HomeComponent(loginService, _router, employeeService) {
        this.loginService = loginService;
        this._router = _router;
        this.employeeService = employeeService;
        this.employee = new employee_1.Employee();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.employee = this.employeeService.getEmployee();
        //this.getLoggedInUser();
    };
    HomeComponent.prototype.getLoggedInUser = function () {
        var _this = this;
        this.loginService.getLoggedInUser().then(function (data) { _this.employee = data; _this.employeeService.setEmployee(_this.employee); }, function (err) { _this._router.navigate(['./login']); });
    };
    HomeComponent.prototype.logout = function () {
        this.loginService.logout().then(function (data) { });
        this._router.navigate(['./login']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-app',
            moduleId: module.id,
            templateUrl: 'home.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router, employee_service_1.EmployeeService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map