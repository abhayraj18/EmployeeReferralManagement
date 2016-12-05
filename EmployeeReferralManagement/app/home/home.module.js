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
//import { BrowserModule } from '@angular/platform-browser';
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var home_routing_module_1 = require('./home-routing.module');
var home_component_1 = require('./home.component');
var detail_component_1 = require('../employee/detail.component');
var add_referral_component_1 = require('../employee/add-referral.component');
var my_referral_component_1 = require('../employee/my-referral.component');
var all_referral_component_1 = require('../employee/all-referral.component');
var referral_detail_component_1 = require('../employee/referral-detail.component');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                home_routing_module_1.routing,
                http_1.HttpModule
            ],
            declarations: [
                add_referral_component_1.AddReferralComponent,
                home_component_1.HomeComponent,
                detail_component_1.DetailComponent,
                my_referral_component_1.MyReferralComponent,
                all_referral_component_1.AllReferralComponent,
                referral_detail_component_1.ReferralDetailComponent
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map