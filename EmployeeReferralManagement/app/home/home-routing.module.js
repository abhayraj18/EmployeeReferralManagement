"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home.component');
var detail_component_1 = require('../employee/detail.component');
var add_referral_component_1 = require('../employee/add-referral.component');
var my_referral_component_1 = require('../employee/my-referral.component');
var all_referral_component_1 = require('../employee/all-referral.component');
var referral_detail_component_1 = require('../employee/referral-detail.component');
var routes = [
    { path: 'home', component: home_component_1.HomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', component: detail_component_1.DetailComponent },
                    { path: 'getMyReferrals', component: my_referral_component_1.MyReferralComponent },
                    { path: 'getAllReferrals', component: all_referral_component_1.AllReferralComponent },
                    { path: 'addNewReferral', component: add_referral_component_1.AddReferralComponent },
                    { path: 'referral/:id', component: referral_detail_component_1.ReferralDetailComponent }
                ]
            }
        ] },
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=home-routing.module.js.map