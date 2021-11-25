import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { TemporaryPasswordComponentComponent } from './auth/temporary-password-component/temporary-password-component.component';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateHiringDriveComponent } from './homepage/create-hiring-drive/create-hiring-drive.component';
import { HiringDriveInformationComponent } from './hiring-drive-information/hiring-drive-information.component';
import { EditHiringDriveComponent } from './edit-hiring-drive/edit-hiring-drive.component';
import { ManageCandidateComponent } from './manage-candidate/manage-candidate.component';
import { ManagePanelistComponent } from './manage-panelist/manage-panelist.component';
import { PanelistManagementComponent } from './panelist-management/panelist-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemporaryPasswordComponentComponent,
    LoaderComponent,
    HomepageComponent,
    NavbarComponent,
    SidebarComponent,
    CreateHiringDriveComponent,
    HiringDriveInformationComponent,
    EditHiringDriveComponent,
    ManageCandidateComponent,
    ManagePanelistComponent,
    PanelistManagementComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
