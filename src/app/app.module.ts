import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule }  from '@angular/router';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssemblyComponent } from './assembly/assembly.component';
import { AuditorsComponent } from './auditors/auditors.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    AdminDashboardComponent,
    AssemblyComponent,
    AuditorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
