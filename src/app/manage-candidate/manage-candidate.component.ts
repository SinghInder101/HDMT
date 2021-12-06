import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

}
