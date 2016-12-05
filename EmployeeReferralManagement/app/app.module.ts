import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginComponent }  from './login/login.component';
import { routing }     from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './services/login.service';
import { EmployeeService } from './services/employee.service';
import { HomeModule } from './home/home.module';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './services/registration.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    HomeModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
	  RegistrationComponent
  ],
   providers: [
        LoginService, EmployeeService, RegistrationService
    ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
