import { Component, OnInit } from '@angular/core';
import { listPanelist } from 'src/Interfaces/listPanelist.interface';
import { managePanelistService } from '../Services/managePanelist.service';
import { Pipe, PipeTransform } from '@angular/core';
import driveEvents from 'src/Interfaces/driveEvents.interface';
import { listAdminsAndUsers } from 'src/Interfaces/listAdminsAndUsers.interface';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms'
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { listAllHiringDriveandIDService } from '../Services/listAllHiringDriveAndID.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-manage-panelist',
  templateUrl: './manage-panelist.component.html',
  styleUrls: ['./manage-panelist.component.css']
})
export class ManagePanelistComponent implements OnInit {

  //NG MULTI-SELECT
  dropdownSettings!:IDropdownSettings
  disabled = false
  myForm!:FormGroup;
  //NG MULTI SELECT

  panelistData!: listPanelist[]
  driveEvents!: driveEvents[]
  listAdminsAndUsers!: listAdminsAndUsers[]
  index: number = 0;
  display: boolean = false;
  drive_name: string = localStorage.getItem('drive_name')!

  emailAndPhoneForm!:FormGroup;
  hiringDriveNamesAndId!: listAllHiringDriveandID []
  loading!:boolean;
  currentName : string = localStorage.getItem('username')!



  constructor(private fb: FormBuilder,private listAllHiringDriveandID: listAllHiringDriveandIDService,private managePanelistService:managePanelistService) {
  
    this.hiringDriveNamesAndId = [
      {
        drive_id:"",
        drive_title:""
      }
    ]

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
    this.myForm = this.fb.group({
      panelist: []
  });
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
    this.loading = true;

    this.listAllHiringDriveandID.getAllHiringDriveandId().subscribe(
      data => {
        if(data.success == false){

        }
        else{
          this.hiringDriveNamesAndId = data.data
        }
      }
    )

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
         this.loading = false;
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
        // this.myForm.get('panelist')?.setValue(this.listAdminsAndUsers)
      }
      
    })
  }

  selectPanelist(event: Event){
    // [name1,name2,name3] //phone [phon1,phone2,phone3] //email [email1,email2,email3]
    //
    console.log((event.target as HTMLInputElement).value)
    this.index = Number((event.target as HTMLInputElement).value);
    this.display = true;

    this.emailAndPhoneForm.get('email')?.setValue(this.listAdminsAndUsers[this.index].email);
    this.emailAndPhoneForm.get('phone_number')?.setValue(this.listAdminsAndUsers[this.index].phone_number)


  }

  savePanelist(){

    var data = []

    const addedPanelist = this.myForm.get('panelist')?.value
    for(var i = 0; i<addedPanelist.length ; i++){

      var currName = addedPanelist[i].name;

      for(var j=0 ; j<this.listAdminsAndUsers.length; j++){

        if(currName == this.listAdminsAndUsers[j].name){

          var person:any= this.listAdminsAndUsers[j]
          person["person_name"] = currName
          data.push(person)
         
        }
      } 
    }
    console.log(data);
    this.managePanelistService.savePanelist(data).subscribe(
      data => {
        if(data.success == false){}
        else{
          console.log(data)
          this.ngOnInit();
        }
      }
    )

    // this.managePanelistService.savePanelist(
    //   this.emailAndPhoneForm.get('email')?.value,
    //   this.emailAndPhoneForm.get('phone_number')?.value,
    //   this.listAdminsAndUsers[this.index].name
    // ).subscribe(
    //   data => {
    //     if(data.success == false){
    //       console.log(data);
    //       this.index = 0;
    //       this.display = false;

    //     }
    //     else{
    //       console.log(data);
    //       this.index = 0;
    //       this.display = false;
    //       this.ngOnInit();
    //     }
    //   }
    // )

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
         window.alert('You cannot change this availability');
         this.ngOnInit()

        }
        else{
          console.log(data);
          this.ngOnInit();
        }
      }
    )
    
  }
  xyz(event:Event){
    console.log((event.target as HTMLInputElement).value)
    localStorage.setItem("drive_id",((event.target as HTMLInputElement).value).split("#")[0]);

    localStorage.setItem("drive_name",((event.target as HTMLInputElement).value).split("#")[1]);
    this.drive_name = localStorage.getItem('drive_name') || "";
    this.ngOnInit();
}

}
