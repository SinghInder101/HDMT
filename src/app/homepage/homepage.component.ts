import { Component, OnInit } from '@angular/core';
import { listHiringDriveService } from '../Services/listHiringDrives.service';
import listHiringDrives from 'src/Interfaces/listHiringDriveInterface';
import { hiringDriveDataInterface } from 'src/Interfaces/hiringDriveDataInterface';
import { Router } from '@angular/router';
import { editHiringDriveService } from '../Services/editHiringDrive.service';
import { manageHiringDriveService } from '../Services/manageHiringDrive.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  drives!:hiringDriveDataInterface[];
  searchTerm!: string
  

  constructor(private manageHiringDriveService:manageHiringDriveService,private listHiringDriveService:listHiringDriveService, private router: Router,private editHiringDriveService:editHiringDriveService) { 

    this.drives = [
      {
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
    ]

    this.searchTerm ="";
   
  }

  ngOnInit(): void {


    this.listHiringDriveService.getHiringDrives().subscribe(
      data => {
        console.log(data);
        
        if(data.success == false){


        }
        else{
          this.router.navigate(['/home'])
           this.drives = data.data;
      

          console.log(this.drives);


        }

      }
    )

  }

  editHiringDrive(drive_id:string){
 
    console.log(drive_id)
    this.router.navigate(['/edit_hiring_drive'])
    this.editHiringDriveService.driveID = drive_id

  }

  manageHiringDrive(drive_id:string){
    localStorage.setItem('drive_id',drive_id);
    console.log(drive_id);
    

    this.router.navigate(['/hiring_drive_information'])
  }

  search(){
    console.log(this.searchTerm)

   
    
    
    

  }
  valueChange(event:Event){

    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);

    if(this.searchTerm == ""){
      this.ngOnInit();
    }
      this.listHiringDriveService.searchTerm = this.searchTerm;

      this.listHiringDriveService.searchHiringDrive().subscribe
      ( data => {
        if(data.success == false) {

        }
        else {
          this.drives = data.data;
        }
      
      }
        
      )

  

  }

}
