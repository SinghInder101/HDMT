import { Component } from '@angular/core';
import {authService} from './Services/auth.service'
import { createHiringDriveService } from './Services/createHiringDrive.service';
import { editHiringDriveService } from './Services/editHiringDrive.service';
import { listAllHiringDriveandIDService } from './Services/listAllHiringDriveAndID.service';
import { listHiringDriveService } from './Services/listHiringDrives.service';
import { manageCandidateService } from './Services/manageCandidate.service';
import { manageHiringDriveService } from './Services/manageHiringDrive.service';
import { managePanelistService } from './Services/managePanelist.service';
import { panelistManagementService } from './Services/panelistManagement.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[authService,createHiringDriveService,listHiringDriveService,editHiringDriveService,manageHiringDriveService,manageCandidateService,managePanelistService,listAllHiringDriveandIDService,panelistManagementService]
})
export class AppComponent {
  title = 'hiring-drive-management-tool';
}
