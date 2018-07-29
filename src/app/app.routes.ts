import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { HomeComponent } from './home/home.component';
import { AssemblyComponent } from './assembly/assembly.component';
import { AuditorsComponent } from './auditors/auditors.component';

export const routes: Routes = [
  { path: "", redirectTo: "v1/login", pathMatch: "full" },
  { path: "v1/login", component: HomeComponent },
  { path: "v1/dashboard", component: AdminDashboardComponent },
  { path: "v1/assembly/:id", component: AssemblyComponent },
  { path: "v1/auditors", component: AuditorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [HomeComponent, AdminDashboardComponent, AssemblyComponent, AuditorsComponent];
