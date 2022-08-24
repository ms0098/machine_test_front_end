import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule)},
  {path: '404', component: NoDataFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
