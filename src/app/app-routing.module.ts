import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TemporaryPasswordComponentComponent } from './auth/temporary-password-component/temporary-password-component.component';
import { EditHiringDriveComponent } from './edit-hiring-drive/edit-hiring-drive.component';
import { HiringDriveInformationComponent } from './hiring-drive-information/hiring-drive-information.component';
import { CreateHiringDriveComponent } from './homepage/create-hiring-drive/create-hiring-drive.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManagePanelistComponent } from './manage-panelist/manage-panelist.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomepageComponent}, 
  {path:'create_hiring_drive',component:CreateHiringDriveComponent},
  {path:'hiring_drive_information',component:HiringDriveInformationComponent},
  {path:'edit_hiring_drive', component:EditHiringDriveComponent},
  {path:'manage_candidates' , component:ManageCandidateComponent},
  {path:'manage_panelist' , component:ManagePanelistComponent}
]

 
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
