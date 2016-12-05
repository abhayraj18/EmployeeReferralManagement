import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { AddReferralComponent } from './employee/add-referral.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule'}
];
export const routing = RouterModule.forRoot(routes);