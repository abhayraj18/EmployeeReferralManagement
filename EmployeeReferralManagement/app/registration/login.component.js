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
var login_info_1 = require('./login-info');
var login_service_1 = require('./login-service');
var router_1 = require('@angular/router');
var employee_service_1 = require('../_services/employee.service');
var employee_1 = require('../_models/employee');
var LoginComponent = (function () {
    function LoginComponent(_router, _service, employeeService) {
        this._router = _router;
        this._service = _service;
        this.employeeService = employeeService;
        this.employee = new employee_1.Employee();
        this.loginInfo = new login_info_1.LoginInfo('', '');
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._service.login(this.loginInfo)
            .then(function (data) {
            _this.employee = data;
            _this.employeeService.setEmployee(_this.employee);
            _this._router.navigate(['/home']);
        }, function (err) { _this.errorMessage = 'Invalid Credentials'; _this.error = err; });
    };
    LoginComponent.prototype.register = function () {
        this._router.navigate(['/home']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-app',
            templateUrl: '../app/login/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, (typeof (_a = typeof login_service_1.LoginService !== 'undefined' && login_service_1.LoginService) === 'function' && _a) || Object, employee_service_1.EmployeeService])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map