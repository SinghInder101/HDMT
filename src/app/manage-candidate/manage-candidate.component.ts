import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { candidateDetails } from 'src/Interfaces/candidateDetails.interface';
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { listAllHiringDriveandIDService } from '../Services/listAllHiringDriveAndID.service';
import { manageCandidateService } from '../Services/manageCandidate.service';

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.css']
})
export class ManageCandidateComponent implements OnInit {

  file:any
  candidateDetails!: candidateDetails[]
  hiringDriveNamesAndId!: listAllHiringDriveandID []
  drive_name:string = localStorage.getItem('drive_name')!
  searchTerm: string = '';
  loading!:boolean;
  currentPage: number = 1;
  totalPages: number = 1;

  addCandidate: FormGroup = new FormGroup( {
    'name' : new FormControl(null,[Validators.required]),
    'email' : new FormControl(null,[Validators.required ,Validators.pattern(
      '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
    )]),
    'roll_no': new FormControl(null,[Validators.required]),
    'phone_no': new FormControl(null,[Validators.required]),
    'graduation_year': new FormControl(null,[Validators.required])
  })

  constructor(private listAllHiringDriveandID: listAllHiringDriveandIDService,private manageCandidateService: manageCandidateService) { 
    this.drive_name = localStorage.getItem('drive_name')!
    this.hiringDriveNamesAndId = [
      {
        drive_id:"",
        drive_title:""
      }
    ]
    this.candidateDetails = [
      {
      status: "",
      interview_time: "",
      interview_date: "",
      email: "",
      panel: "",
      candidate_name: "" ,
      roll_no: "",
      graduation_year: "",
      phone_number: "",
      feedback: "",
      type:"",

  }
    ]
  }

  ngOnInit(): void {
    this.loading = true;
    this.drive_name = localStorage.getItem('drive_name')!;
    this.listAllHiringDriveandID.getAllHiringDriveandId().subscribe(
      data => {
        if(data.success == false){



        }
        else{
          this.hiringDriveNamesAndId = data.data
        }
      }
    )
    this.manageCandidateService.getCandidates().subscribe(
      data => {
        if(data.success == false){
         this.candidateDetails = [
            {
            status: "",
            interview_time: "",
            interview_date: "",
            email: "",
            panel: "",
            candidate_name: "" ,
            roll_no: "",
            graduation_year: "",
            phone_number: "",
            feedback: "",
            type:"",
      
        }
          ]

        }
        else{
          this.candidateDetails = data.data
        }
      }
    )
    this.loading = false;
   
  }

  selectedFile(event:Event){

    this.file = (event.target as HTMLInputElement).files;
    console.log(this.file);

  }

  uploadFile(){
    
    this.manageCandidateService.candidate_file = this.file.item(0);

    this.manageCandidateService.uploadCandidates().subscribe(
      data => {
        if(data.success == false){

        }
        else{
          console.log(data.message)
          
          this.ngOnInit()
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
valueChange(event:Event){

  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);

  if(this.searchTerm == ""){
    this.ngOnInit();
  }
    

    this.manageCandidateService.searchCandidates(this.searchTerm).subscribe
    ( data => {
      if(data.success == false) {

      }
      else {
        this.candidateDetails= data.data;
      }
    
    }
      
    )



}

addCandidateForm(){

  var data = {
    'drive_id': localStorage.getItem('drive_id'),
    'email': this.addCandidate.get('email')?.value,
    'candidate_name': this.addCandidate.get('name')?.value,
    'phone_number':this.addCandidate.get('phone_no')?.value,
    'drive_name':this.drive_name,
    'graduation_year':this.addCandidate.get('graduation_year')?.value,
    'roll_no':this.addCandidate.get('roll_no')?.value
  }
  this.manageCandidateService.addCandidate(data).subscribe(
    data => {
      if(data.success == false){

      }
      else{
        console.log(data);
        this.ngOnInit();
      }
    }
  )

}
counter(flag: number){
  if(flag == 1 && this.currentPage != this.totalPages){
    this.currentPage++;
    this.ngOnInit();

  }
  else if(flag == 0 && this.currentPage!=1){
    this.currentPage--;
    this.ngOnInit();
  }

}

}
