import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { candidateDetails } from 'src/Interfaces/candidateDetails.interface';
import { manageCandidateService } from '../Services/manageCandidate.service';

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.css']
})
export class ManageCandidateComponent implements OnInit {

  file:any
  candidateDetails!: candidateDetails[]

  constructor(private manageCandidateService: manageCandidateService) { 
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
    this.manageCandidateService.getCandidates().subscribe(
      data => {
        if(data.success == false){

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
        }
      }
    )

  }

}
