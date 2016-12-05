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
var login_info_1 = require('./login-info');
var login_service_1 = require('../services/login.service');
var employee_service_1 = require('../services/employee.service');
var employee_1 = require('../models/employee');
var LoginComponent = (function () {
    function LoginComponent(_router, loginService, employeeService, renderer) {
        this._router = _router;
        this.loginService = loginService;
        this.employeeService = employeeService;
        this.renderer = renderer;
        this.employee = new employee_1.Employee();
        this.loginInfo = new login_info_1.LoginInfo('', '');
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
        this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!this.loginInfo.employeeId) {
            //alert("Please fill Employee Id");
            this.errorMessage = "Please fill Employee Id";
            this.renderer.invokeElementMethod(this.employeeIdInput.nativeElement, 'focus');
            return;
        }
        if (!this.loginInfo.password) {
            //alert("Please fill password");
            this.errorMessage = "Please fill password";
            this.renderer.invokeElementMethod(this.passwordInput.nativeElement, 'focus');
            return;
        }
        this.loginService.login(this.loginInfo)
            .then(function (data) {
            _this.employee = data;
            _this.employeeService.setEmployee(_this.employee);
            _this._router.navigate(['/home']);
        }, function (err) { _this.errorMessage = err; });
    };
    __decorate([
        core_1.ViewChild('employeeId'), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "employeeIdInput", void 0);
    __decorate([
        core_1.ViewChild('password'), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginComponent.prototype, "passwordInput", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-app',
            templateUrl: '../app/login/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, employee_service_1.EmployeeService, core_1.Renderer])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map