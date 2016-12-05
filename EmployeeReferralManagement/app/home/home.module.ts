import { NgModule }      from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { routing }     from './home-routing.module';
import { HomeComponent } from './home.component';
import { DetailComponent } from '../employee/detail.component';
import { AddReferralComponent } from '../employee/add-referral.component';
import { MyReferralComponent } from '../employee/my-referral.component';
import { AllReferralComponent } from '../employee/all-referral.component';
import { ReferralDetailComponent } from '../employee/referral-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AddReferralComponent,
    HomeComponent,
    DetailComponent,
    MyReferralComponent,
    AllReferralComponent,
    ReferralDetailComponent
  ],
   providers: [
       
    ]
})

export class HomeModule { }
