import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import createHiringDrive from 'src/Interfaces/createHiringDrive';
import { hiringDriveDataInterface } from 'src/Interfaces/hiringDriveDataInterface';
import { listAdminsAndUsers } from 'src/Interfaces/listAdminsAndUsers.interface';
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
  admins:Array<string> = []
  users!:listAdminsAndUsers[]
  eventNames: Array<string> = [ "Pre Placement Talk",
  "Interview Round 1",
  "Interview Round 2",
  "Interview Round 3",
  "Interview Round 4",
  "Interview Round 5"
]
dayNames: Array<String> = [  "Day 1",
"Day 2",
"Day 3",
"Day 4",
"Day 5",
"Day 6",
"Day 7",
"Day 8",
"Day 9",
"Day 10"]

//NG MULTI SELECT
dropdownSettings!:IDropdownSettings
disabled = false;
myForm!:FormGroup;


  constructor(private fb: FormBuilder, private createHiringDriveService:createHiringDriveService, private editHiringDriveService:editHiringDriveService, private router: Router) { 



 this.addData =[0];

this.hiringDriveDates = new FormGroup({})
this.contactPerson = new FormGroup({});
this.hiringDriveDetails = new FormGroup({});
this.day = 1;

this.users = [{
  name: '',
  email:'',
  phone_number:'',
  role:''
}]


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

    this.myForm = this.fb.group({
      city: [this.users]
    })

    this.dropdownSettings = {
      "singleSelection": false,
      "idField": "email",
      "textField": "name",
      "selectAllText": "Select All",
      "unSelectAllText": "Unselect All",
      "enableCheckAll": true,
      "itemsShowLimit": 3,
      "allowSearchFilter": true
    }

    this.editHiringDriveService.listAllUsers().subscribe(
      data => {
        if(data.success == false){

        }
        else {
          this.users = data.data;
          console.log(this.users)
         
        }
      }
    )

   

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
          this.admins = data.data.drive_admins
 
          this.myForm.get('city')?.setValue(this.admins)
          
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
  

   var addedAdmins = this.myForm.get('city')?.value
  
  
   var addAdminsFin =[]
   for(var i = 0 ; i<addedAdmins.length ;i++){
     addAdminsFin.push(addedAdmins[i].name);

   }
   this.createHiringDriveFormData.drive_admins = addAdminsFin;

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
  addAdmin(event:Event){

    var admin = (event.target as HTMLInputElement).value
    console.log(admin)


    if(this.admins.indexOf(admin) == -1 && admin != 'Select'){
      this.admins.push(admin);
    }

  }
  removeAdmin(event:Event){
    
    this.admins = this.admins.filter( (admin) => {

      return admin != (event.target as HTMLInputElement).value
    })
  }
}
