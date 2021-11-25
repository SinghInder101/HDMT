import { Component, OnInit } from '@angular/core';
import getEventDays from 'src/Interfaces/getEventDays.component';
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { listInterviewPanelist } from 'src/Interfaces/listInterviewPanelist.interface';
import { listAllHiringDriveandIDService } from '../Services/listAllHiringDriveAndID.service';
import { panelistManagementService } from '../Services/panelistManagement.service';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-panelist-management',
  templateUrl: './panelist-management.component.html',
  styleUrls: ['./panelist-management.component.css']
})
export class PanelistManagementComponent implements OnInit {

  hiringDriveNamesAndId!: listAllHiringDriveandID []
  eventDays!:getEventDays[];
  interviewPanelistData!:listInterviewPanelist[];
  flag:boolean = false;
  time = {hour: 13, minute: 30};
  currentEvent!: string
  currentDate!: string

  distributeCandidateForm!: FormGroup

  constructor(private listAllHiringDriveandID: listAllHiringDriveandIDService, private panelistManagementService: panelistManagementService) {

    this.distributeCandidateForm = new FormGroup ({
      'hours': new FormControl(null,[Validators.required]),
      'minutes': new FormControl(null,[Validators.required]),
      'meridian': new FormControl(null,[Validators.required]),
      'panelist' : new FormControl(null,[Validators.required]),
      'breakInInterviews' : new FormControl(1 , [Validators.required]),
      'lunchBreakDuration' : new FormControl(1 , [Validators.required])
    })

    this.hiringDriveNamesAndId = [
      {
        drive_id:"",
        drive_title:""
      }
    ]
    this.eventDays = [
      {
        name: "",
        date: "",

      }
    ]
    this.interviewPanelistData = [
      {
        node: "panel#98ded190-eaf2-4cf2-be36-30ea00ce189c",
        created_at: "2021-11-20 14:22:28.772012",
        interview_round: "Interview Round 1-Day 1",
        created_by: "Vinny Sharma",
        coordinator: [
            "Anne",
            "Bob"
        ],
        panelist: [
            "Vinny Sharma"
        ],
        description: "Interview Round 1-Day 1",
        panel_title: "Panel - 1",
        type: "interview_round#Interview Round 1-Day 1panel_id#Panel - 1"

      }
    ]
    

    
   }

  ngOnInit(): void {

    this.listAllHiringDriveandID.getAllHiringDriveandId().subscribe(
      data => {
        if(data.success == false){

        }
        else{
          this.hiringDriveNamesAndId = data.data
        }
      }
    )

    this.panelistManagementService.getEventDays().subscribe(
      data => {

        if(data.success == false){

        }
        else{
          this.eventDays = data.data;
          this.currentEvent = this.eventDays[1].name;/*Change*/
          this.currentDate = this.eventDays[1].date /*Change*/
          this.flag = true;
          

        }

      }
    )

   setTimeout(() => {
    this.panelistManagementService.listInterviewPanelist(this.eventDays[1].name /*Change*/).subscribe(
      data => {
        
        if(data.success == false){

        }
        else {
          this.interviewPanelistData = data.data;
          console.log(this.interviewPanelistData);
          

        }
      }
    )

   },1000)
    

    }



    distributeCandidates(){

      var body = {
        drive_id: "98ded190-eaf2-4cf2-be36-30ea00ce189c", // Change
        interview_round: this.currentEvent,
        interview_details:{
          start_time: this.distributeCandidateForm.get('hours')?.value+":"+this.distributeCandidateForm.get('minutes')?.value+" "+this.distributeCandidateForm.get('meridian')?.value, // Change
          interviews_per_panel:this.distributeCandidateForm.get('panelist')?.value,
          break:this.distributeCandidateForm.get('breakInInterviews')?.value,
          lunch_break:this.distributeCandidateForm.get('lunchBreakDuration')?.value,
          date: this.currentDate
        }
  
      }
      console.log(body)


      this.panelistManagementService.distributeCandidates(body).subscribe(
        data => {
          if(data.success == false){

          }
          else{
            console.log(data);
          }
        }
      )


    }

  }


