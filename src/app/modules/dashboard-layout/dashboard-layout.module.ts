import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserFormComponent } from './user-management/user-form/user-form.component';
import { StatisticsComponent } from './user-management/statistics/statistics.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UserManagementComponent,
    UserFormComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    DashboardLayoutRoutingModule,
    SharedModule
  ]
})
export class DashboardLayoutModule { }
