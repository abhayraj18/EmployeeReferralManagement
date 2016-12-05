"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var registration_component_1 = require('./registration/registration.component');
var app_component_1 = require('./app.component');
var routes = [
    { path: '', component: app_component_1.AppComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: 'home', loadChildren: 'app/home/home.module#HomeModule' }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map