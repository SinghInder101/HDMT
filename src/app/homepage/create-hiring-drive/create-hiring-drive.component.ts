import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import createHiringDrive from 'src/Interfaces/createHiringDrive';
import { createHiringDriveService } from 'src/app/Services/createHiringDrive.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { listAdminsAndUsers } from 'src/Interfaces/listAdminsAndUsers.interface';

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
  users!:listAdminsAndUsers[]
  admins!:Array<string>
  eventNames: Array<string> = [ "Pre Placement Talk",
  "Interview Round 1",
  "Interview Round 2",
  "Interview Round 3",
  "Interview Round 4",
  "Interview Round 5"]
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

  constructor( private createHiringDriveService:createHiringDriveService,private router: Router ) { 
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

this.users = [{
  name: '',
  email:'',
  phone_number:'',
  role:''
}]
this.admins = []

 }

  ngOnInit(): void {

    this.createHiringDriveService.listAllUsers().subscribe(
      data => {
        if(data.success == false){

        }
        else {
          this.users = data.data;
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
  }

  addDate(){
    
    const group = new FormGroup({
      'name' : new FormControl("Pre Placement Talk", Validators.required),
      'day' : new FormControl("Day 1", Validators.required),
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
      'email': new FormControl(null ,  [
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
   this.createHiringDriveFormData.drive_admins = this.admins;

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
