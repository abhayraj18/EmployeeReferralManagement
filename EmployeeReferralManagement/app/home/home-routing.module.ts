import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from '../employee/detail.component';
import { AddReferralComponent } from '../employee/add-referral.component';
import { MyReferralComponent } from '../employee/my-referral.component';
import { AllReferralComponent } from '../employee/all-referral.component';
import { ReferralDetailComponent } from '../employee/referral-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
  children: [
      {
        path: '',
        children: [
          { path: '', component: DetailComponent},
          { path: 'getMyReferrals', component: MyReferralComponent},
          { path: 'getAllReferrals', component: AllReferralComponent},
          { path: 'addNewReferral', component: AddReferralComponent},
          { path: 'referral/:id', component: ReferralDetailComponent}
        ]
      }
    ]},
];

export const routing = RouterModule.forChild(routes);