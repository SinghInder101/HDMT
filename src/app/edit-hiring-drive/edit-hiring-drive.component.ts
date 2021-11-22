import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import createHiringDrive from 'src/Interfaces/createHiringDrive';
import { hiringDriveDataInterface } from 'src/Interfaces/hiringDriveDataInterface';
import { createHiringDriveService
 } from '../Services/createHiringDrive.service';
import { editHiringDriveService } from '../Services/editHiringDrive.service';

@Component({
  selector: 'app-edit-hiring-drive',
  templateUrl: './edit-hiring-drive.component.html',
  styleUrls: ['./edit-hiring-drive.component.css']
})
export class EditHiringDriveComponent implements OnInit {

  addData:any[] =[]
  isChecked:boolean = true


  hiringDriveDates:FormGroup
  contactPerson:FormGroup
  hiringDriveDetails:FormGroup
  day:number
  createHiringDriveFormData!:createHiringDrive;
  editHiringDriveFormData!:hiringDriveDataInterface


  constructor( private createHiringDriveService:createHiringDriveService, private editHiringDriveService:editHiringDriveService, private router: Router) { 
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
this.editHiringDriveFormData =  {
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

    //GET THE DATA OF THE DRIVE FROM EDIT HIRING DRIVE SERVICE
    this.editHiringDriveService.getHiringDrive().subscribe(
      data => {
        console.log(data);
        if(data.success == false){

      

        }
        else{
          this.editHiringDriveFormData = data.data;
          
          //Fill in the Inputs with the requisite data received.

          this.hiringDriveDetails.get('hiringDriveName')?.setValue(this.editHiringDriveFormData.drive_title);
          this.hiringDriveDetails.get('hiringDriveDescription')?.setValue(this.editHiringDriveFormData.description)

          for(var i = 0 ; i< this.editHiringDriveFormData.events.length ; i++){

            const group = new FormGroup({

              'name' : new FormControl(null, Validators.required),
              'day' : new FormControl(this.day, Validators.required),
              'date': new FormControl(null,Validators.required),
              'time': new FormControl(null,Validators.required)
        
            });

            (<FormArray>this.hiringDriveDates?.get('data')).push(group);

            (<FormArray><unknown>this.hiringDriveDates?.get(['data', i, 'name'])?.setValue(this.editHiringDriveFormData.events[i].name));

            (<FormArray><unknown>this.hiringDriveDates?.get(['data', i, 'day'])?.setValue(this.editHiringDriveFormData.events[i].day));

            (<FormArray><unknown>this.hiringDriveDates?.get(['data', i, 'date'])?.setValue(this.editHiringDriveFormData.events[i].date));

            (<FormArray><unknown>this.hiringDriveDates?.get(['data', i, 'time'])?.setValue(this.editHiringDriveFormData.events[i].time));

            


          }

          for(var i = 0; i<this.editHiringDriveFormData.contact_person.length ; i++){

            const group:any = new FormGroup({

              'name' : new FormControl(null, Validators.required),
              'phone_number': new FormControl(null , Validators.required),
              'email': new FormControl(null , [
                Validators.required, 
                Validators.pattern(
                '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
              )])
        
            });

            (<FormArray>this.contactPerson?.get('data')).push(group);

            (<FormArray><unknown>this.contactPerson?.get(['data', i, 'name'])?.setValue(this.editHiringDriveFormData.contact_person[i].name));

            (<FormArray><unknown>this.contactPerson?.get(['data', i, 'phone_number'])?.setValue(this.editHiringDriveFormData.contact_person[i].phone_number));

            (<FormArray><unknown>this.contactPerson?.get(['data', i, 'email'])?.setValue(this.editHiringDriveFormData.contact_person[i].email));


          }

        }


      }
    )




  }

  addDate(){
    
    const group = new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'day' : new FormControl(null,Validators.required),
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
      'email': new FormControl(null , [
        Validators.required, 
        Validators.pattern(
        '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
      )])

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

   this.editHiringDriveService.editHiringDriveData(this.createHiringDriveFormData).subscribe(
     data => {
       console.log(data);

       if(data.success == false){

       }
       else{
         this.router.navigate(['/home'])
       }
     }
   )

  //  this.createHiringDriveService.createHiringDrive(this.createHiringDriveFormData).subscribe
  //  ( data =>{ console.log(data)
  //    if(data.success == false){
  //      console.log('Hiring Drive Not Created')
       
  //    }
  //    else{
  //      console.log("Hiring Drive has been Created Successfully")
  //    }

  //    }
  //  );
   

    
  }
}
