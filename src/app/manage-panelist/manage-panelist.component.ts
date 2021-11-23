import { Component, OnInit } from '@angular/core';
import { listPanelist } from 'src/Interfaces/listPanelist.interface';
import { managePanelistService } from '../Services/managePanelist.service';
import { Pipe, PipeTransform } from '@angular/core';
import driveEvents from 'src/Interfaces/driveEvents.interface';
import { listAdminsAndUsers } from 'src/Interfaces/listAdminsAndUsers.interface';
import {FormGroup,FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-manage-panelist',
  templateUrl: './manage-panelist.component.html',
  styleUrls: ['./manage-panelist.component.css']
})
export class ManagePanelistComponent implements OnInit {


  panelistData!: listPanelist[]
  driveEvents!: driveEvents[]
  listAdminsAndUsers!: listAdminsAndUsers[]
  index: number = 0;
  display: boolean = false;

  emailAndPhoneForm!:FormGroup;



  constructor(private managePanelistService:managePanelistService) {

   

    this.panelistData =[{
      person_name:"",
      drive_id:"",
      email:"",
      phone_number:"",
      availability: [
        
          '0'
        
       
      ],
     
    }


   ]

   this.driveEvents = [
     {
       name: "",
       date: "",
       time:"",
       day:""
     }
   ]
   
   this.listAdminsAndUsers = [
     {
       name: "",
       phone_number:"",
       role: "",
       email:""
     }

   ]

  }

  ngOnInit(): void {

    this.emailAndPhoneForm = new FormGroup ({
      'email' : new FormControl(null ,[
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
      'phone_number' : new FormControl(null , [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ])
    })
  

    this.managePanelistService.listPanelist().subscribe(
      data => {
        if(data.success == false){

        }
        else {
          console.log(data);
          this.panelistData = data.data;
          console.log(this.panelistData)
        }
      }
    )

    this.managePanelistService.listDriveDates().subscribe(
      data => {
        if(data.success == false){

        }
        else{
         this.driveEvents = data.data
        }
      }
    )




  }

  listAdminsAndUsersFunction(){
  
    this.managePanelistService.listAdminsAndUsers().subscribe(data => {
      if(data.success == false){

      }
      else{
        this.listAdminsAndUsers = data.data;
      }
      
    })
  }

  selectPanelist(event: Event){

    console.log((event.target as HTMLInputElement).value)

    this.index = Number((event.target as HTMLInputElement).value);
    this.display = true;

    this.emailAndPhoneForm.get('email')?.setValue(this.listAdminsAndUsers[this.index].email);
    this.emailAndPhoneForm.get('phone_number')?.setValue(this.listAdminsAndUsers[this.index].phone_number)


    




  }

  savePanelist(){

    this.managePanelistService.savePanelist(
      this.emailAndPhoneForm.get('email')?.value,
      this.emailAndPhoneForm.get('phone_number')?.value,
      this.listAdminsAndUsers[this.index].name
    ).subscribe(
      data => {
        if(data.success == false){
          console.log(data);
          this.index = 0;
          this.display = false;

        }
        else{
          console.log(data);
          this.index = 0;
          this.display = false;
          this.ngOnInit();
        }
      }
    )

  }

  abc(event: Event){
    console.log(this.driveEvents)
    console.log((event.target as HTMLInputElement).value);

    var index = ((event.target as HTMLInputElement).value).slice(1,((event.target as HTMLInputElement).value).length)
    var b = ((event.target as HTMLInputElement).id).slice(10, ((event.target as HTMLInputElement).id).length);
    console.log(b);
    var a = {

      'drive_id': localStorage.getItem('drive_id'),
      'email' : b,
      'availability' :Array<Object>()

    }
    
    console.log(this.panelistData);

    for(var i = 0 ; i< this.driveEvents.length ; i++){
      var x = this.driveEvents[i].date;
      var y = 'Select'

      if(this.panelistData[Number(index)].availability[i] == 'Yes')
      {
        y='Yes'

      }
      if(this.panelistData[Number(index)].availability[i] == 'No')
      {
        y='No'

      }
      if(x == ((event.target as HTMLInputElement).id).slice(0, 10)){

        if(((event.target as HTMLInputElement).value).slice(0,1) == '1'){
        
          y='Yes'


        }
        else{
          y = 'No'
        }


       
      }
      a.availability.push(
      {
       [x]:y
      }
      )



     
    }
    this.managePanelistService.editPanelistStatus(a).subscribe(
      data => {
        if(data.success == false){
          console.log(data);

        }
        else{
          console.log(data);
          this.ngOnInit();
        }
      }
    )
    
  }

}
