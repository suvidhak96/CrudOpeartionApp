import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { user } from './components/userMaster/userMaster.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'',component:UserComponent},
  {path:'userMaster',component:UserComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
