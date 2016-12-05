"use strict";
var router_1 = require('@angular/router');
var add_referral_component_1 = require('../referral/add-referral.component');
var routes = [
    { path: 'home#/getMyReferrals', component: add_referral_component_1.AddReferralComponent },
    { path: 'home#/getAllReferrals', component: add_referral_component_1.AddReferralComponent },
    { path: 'home#/addNewReferral', component: add_referral_component_1.AddReferralComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map