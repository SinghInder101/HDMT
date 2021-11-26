import { Component, OnInit } from '@angular/core';
import getEventDays from 'src/Interfaces/getEventDays.component';
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { listInterviewPanelist } from 'src/Interfaces/listInterviewPanelist.interface';
import { listCandidatesInPanel } from 'src/Interfaces/listCandidatesInPanel.interface';
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
  listCandidatesInPanelData!:Array<listCandidatesInPanel[]>

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
        type: "interview_round#Interview Round 1-Day 1panel_id#Panel - 1",
        

      }
    ]
    this.listCandidatesInPanelData = [ [
      {
        candidate_name: "vishali",
          email: "vaishali000b@gmail.com",
            phone_number: "2228393441",
            feedback: [
                "Not good in technical round",
                "Not available"
            ],
            interview_date: "2021-10-23",
            updated_at: "2021-11-26 06:12:31.162510",
            updated_by: "string",
            updated_on: "2021-11-26 06:12:31.162510",
            interview_time: "09:10 AM - 10:10 AM",
            status: [
                "rejected",
                "selected"
            ]

      }
      
    ]
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
          for(let i = 0 ; i<data.data.length - 1 ; i++){

            this.listCandidatesInPanelData.push( [{
              candidate_name: "raja",
                email: "",
                  phone_number: "",
                  feedback: [
                      "",
                      ""
                  ],
                  interview_date: "",
                  updated_at: "",
                  updated_by: "",
                  updated_on: "",
                  interview_time: "",
                  status: [
                      "",
                      ""
                  ]
      
            }])

          }
          
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

    listCandidatesInPanel(data:string){

      const dataArray= data.split("#");
      console.log(dataArray);

      const panel_title = dataArray [0];
      const index = dataArray[1];

      this.panelistManagementService.listCandidatesInPanel(panel_title,this.currentEvent).subscribe(
        data => {
          if(data.success == false){

          }
          else{
            this.listCandidatesInPanelData[Number(index)] = data.data;
          }
        }
      )

  

    }

  }


