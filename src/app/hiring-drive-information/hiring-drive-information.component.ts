import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import getTotalAndSelectedCandidates from 'src/Interfaces/getTotalAndSelectedCandidates.interface';
import { hiringDriveDataInterface } from 'src/Interfaces/hiringDriveDataInterface';
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { editHiringDriveService } from '../Services/editHiringDrive.service';
import { listAllHiringDriveandIDService } from '../Services/listAllHiringDriveAndID.service';
import { manageHiringDriveService } from '../Services/manageHiringDrive.service';

@Component({
  selector: 'app-hiring-drive-information',
  templateUrl: './hiring-drive-information.component.html',
  styleUrls: ['./hiring-drive-information.component.css']
})
export class HiringDriveInformationComponent implements OnInit {

  hiringDriveData!:hiringDriveDataInterface;
  hiringDriveNamesAndId!: listAllHiringDriveandID []

  totalAndSelectedCandidates!:getTotalAndSelectedCandidates
  drive_name:string = localStorage.getItem('drive_name')!;
 
  constructor(private listAllHiringDriveandIDService:listAllHiringDriveandIDService,private manageHiringDriveService:manageHiringDriveService, private editHiringDriveService: editHiringDriveService, private router: Router) { 

    this.hiringDriveData =  {
      drive_admins: [],
    node: "string",
    events: [
      {
          name:"string",
          date:"string",
          time:"string",
          day:"string",
    
      }
    
    ],
    contact_person: [
      {
          name: "string",
          email: "string",
          phone_number: "string"
    
      }
    ],
    created_by: "string",
    created_on : "string",
    description: "string",
    drive_id: "string",
    drive_title: "string",
    type: "string"
      
     
    
    
    }

    this.totalAndSelectedCandidates = {
      number_of_candidates : "0",
      number_of_selected_candidates:"0"
    }
    this.hiringDriveNamesAndId = [
      {
        drive_id:"",
        drive_title:""
      }
    ]
    
  }

  ngOnInit(): void {

    this.manageHiringDriveService.getHiringDrive().subscribe(
      data => {
        console.log(data.data.drive_id)
        
       
        if(data.success == false){

        }
        if(data.success == true){

          this.hiringDriveData = data.data;
          

        }
      }
    
    )

    this.manageHiringDriveService.getTotalAndSelectedCandidates().subscribe(
      data => {
        
        if(data.success == false){
          

        }
        else{

          console.log(data.data);
        this.totalAndSelectedCandidates = data.data

        }
      }
    )

    this.listAllHiringDriveandIDService.getAllHiringDriveandId().subscribe(
      data => {
        if(data.success == false){

        }
        if(data.success == true){
          this.hiringDriveNamesAndId = data.data
        }
      }
    )
  




  }
  abc(event:Event){
    console.log((event.target as HTMLInputElement).value)
    localStorage.setItem("drive_id",((event.target as HTMLInputElement).value).split("#")[0]);

    localStorage.setItem("drive_name",((event.target as HTMLInputElement).value).split("#")[1]);
    this.drive_name = localStorage.getItem('drive_name') || "";

    
      this.ngOnInit();
  }
  editHiringDrive(drive_id:string){

    this.router.navigate(['/edit_hiring_drive'])
    this.editHiringDriveService.drive_id = drive_id;
    
  }


}
