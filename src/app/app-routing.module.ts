import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TemporaryPasswordComponentComponent } from './auth/temporary-password-component/temporary-password-component.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomepageComponent, children:[
    {path:'',component:HomepageComponent}]}
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
