import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import createHiringDrive from 'src/Interfaces/createHiringDrive';
import { createHiringDriveService } from 'src/app/Services/createHiringDrive.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-create-hiring-drive',
  templateUrl: './create-hiring-drive.component.html',
  styleUrls: ['./create-hiring-drive.component.css']
})
export class CreateHiringDriveComponent implements OnInit {

  addData:any[] =[]


  hiringDriveDates:FormGroup
  contactPerson:FormGroup
  hiringDriveDetails:FormGroup
  day:number
  createHiringDriveFormData!:createHiringDrive;

  constructor( private createHiringDriveService:createHiringDriveService,private router: Router) { 
 this.addData =[0];

this.hiringDriveDates = new FormGroup({})
this.contactPerson = new FormGroup({});
this.hiringDriveDetails = new FormGroup({});
this.day = 1;

this.createHiringDriveFormData = {
  description:"",
  drive_admins:[],
  drive_title:"",
  contact_person:[],
  events:[]

}

 }

  ngOnInit(): void {

    this.hiringDriveDetails = new FormGroup({
      'hiringDriveName' : new FormControl(null, Validators.required),
      'hiringDriveDescription':new FormControl(null, Validators.required),

    })
    this.hiringDriveDates = new FormGroup({
      'data' : new FormArray([])
    })
    this.contactPerson =  new FormGroup({
      'data': new FormArray([])
    })
  }

  addDate(){
    
    const group = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'day' : new FormControl(null, Validators.required),
      'date': new FormControl(null,Validators.required),
      'time': new FormControl(null,Validators.required)

    })

    const control = new FormControl(null,Validators.required);

    (<FormArray>this.hiringDriveDates?.get('data')).push(group)

    this.day++;
    console.log((<FormArray>this.hiringDriveDates.get('data')));
   
  }

  getControls(){
    return(<FormArray>this.hiringDriveDates.get('data')).controls;
  }

  addContactPerson(){
    
 
    const group:any = new FormGroup({

      'name' : new FormControl(null, Validators.required),
      'phone_number': new FormControl(null , Validators.required),
      'email': new FormControl(null , Validators.required)

    });

    (<FormArray>this.contactPerson?.get('data')).push(group)

   

  }
  getContactControls(){
   return(<FormArray>this.contactPerson.get('data')).controls
  }

  saveHiringDrive(){
  

   this.createHiringDriveFormData.drive_title = this.hiringDriveDetails.get('hiringDriveName')?.value;
   this.createHiringDriveFormData.contact_person = (<FormArray>this.contactPerson.get('data')).value;
   this.createHiringDriveFormData.events = (<FormArray>this.hiringDriveDates.get('data')).value;
   this.createHiringDriveFormData.description = this.hiringDriveDetails.get('hiringDriveDescription')?.value
   this.createHiringDriveFormData.drive_admins = ["Inder","Vinny"];

   console.log(this.createHiringDriveFormData)
   this.createHiringDriveService.createHiringDrive(this.createHiringDriveFormData).subscribe
   ( data =>{ console.log(data)
     if(data.success == false){
       console.log('Hiring Drive Not Created')

     
       
     }
     else{
       console.log("Hiring Drive has been Created Successfully")
       this.router.navigate(['/home'])
     }

     }
   );
   

    
  }
}
