import { Component, OnInit } from '@angular/core';
import getEventDays from 'src/Interfaces/getEventDays.component';
import { listAllHiringDriveandID } from 'src/Interfaces/listAllHiringDriveAndID.interface';
import { listInterviewPanelist } from 'src/Interfaces/listInterviewPanelist.interface';
import { listCandidatesInPanel } from 'src/Interfaces/listCandidatesInPanel.interface';
import { listAllHiringDriveandIDService } from '../Services/listAllHiringDriveAndID.service';
import { panelistManagementService } from '../Services/panelistManagement.service';
import {FormGroup,FormControl, Validators, FormArray} from '@angular/forms'
import { ThrowStmt } from '@angular/compiler';
import { staticFileData } from 'src/Interfaces/staticFileData.interface';
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { addPanelistToPanel } from 'src/Interfaces/addPanelistToPanel.interface';
import { listAdminsAndUsers } from 'src/Interfaces/listAdminsAndUsers.interface';
import { getSelectedCandidates } from 'src/Interfaces/getSelectedCandidates.interface';

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
  drive_name:string = localStorage.getItem('drive_name') || "";

  currentEvent!: string
  currentDate!: string
  candidateSelectionStatus:Array<String> = [];
  submitFeedbackButtonDisabled: boolean = true;

  distributeCandidateForm!: FormGroup

  listCandidatesInPanelData!:Array<listCandidatesInPanel[]>
 addCandidate!:FormGroup // For add candidate in Panel
 selectedCandidates:getSelectedCandidates[] = [
   {
  candidate_name: '',
  email:''
}
 ] 
  candidateFeedback!: FormGroup;
  addPanelistForm!:FormGroup;
  addPanelistData!: staticFileData
  getPanelistNames!: addPanelistToPanel[];
  panelistToPanel: Array<String> = [];
  coordinatorToPanel:Array<String> = [];
  getUserNames:listAdminsAndUsers[] = [{
    name:'',
    phone_number:"",
    role:"",
    email:"",
  }]
  loading!:boolean

  constructor(private listAllHiringDriveandID: listAllHiringDriveandIDService, private panelistManagementService: panelistManagementService) {
    this.addCandidate = new FormGroup ({
      'candidateData' : new FormArray([]
       
      )
    })

    this.getPanelistNames = [
      {
        person_name:'a'
      },{
        person_name:'b'
      }
    ]
    this.addPanelistForm = new FormGroup({
      'interviewRound' : new FormControl({value: '', disabled: true},[Validators.required]),
     'panelDescription' : new FormControl(null,[Validators.required]),
     'panelTitle': new FormControl(null , [Validators.required])
    
    })
    this.addPanelistData = {
      'user_roles':[''],
      'drive_events':[''],
      'panel_title':['']
    }
    this.distributeCandidateForm = new FormGroup ({
      'hours': new FormControl(null,[Validators.required]),
      'minutes': new FormControl(null,[Validators.required]),
      'meridian': new FormControl(null,[Validators.required]),
      'panelist' : new FormControl(5,[Validators.required]),
      'breakInInterviews' : new FormControl(15, [Validators.required]),
      'lunchBreakDuration' : new FormControl(60 , [Validators.required])
    })
  
    this.candidateFeedback = new FormGroup ({
      'feedback' : new FormControl(null,[Validators.required])

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
    this.panelistManagementService.getCandidates().subscribe(
      data => {
        if(data.success == false){
 
        }
        else{
         this.selectedCandidates = data.data
        }
      }
    )

    this.panelistManagementService.getEventDays().subscribe(
      data => {

        if(data.success == false){

        }
        else{
          this.eventDays = data.data;
          this.currentEvent = this.eventDays[0].name;/*Change*/
          this.addPanelistForm.get('interviewRound')?.setValue(this.currentEvent)
          this.currentDate = this.eventDays[0].date;/*Change*/
          this.flag = true;
          

        }

      }
    )

   setTimeout(() => {
    this.panelistManagementService.listInterviewPanelist(this.currentEvent /*Change*/).subscribe(
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
          this.loading = false;
          
          console.log(this.interviewPanelistData);
          

        }
      }
    )

   },1000)
    

    }

    distributeCandidates(){

      var body = {
        drive_id: localStorage.getItem('drive_id'), // Change
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

    setFeedback(){

    
    

    const body = {

      drive_id : localStorage.getItem('drive_id'),
      interview_round:this.currentEvent,
      email: this.candidateSelectionStatus[0],
      status: this.candidateSelectionStatus[1],
      panel_title: this.candidateSelectionStatus[2],
      feedback: this.candidateFeedback.get('feedback')?.value || ""

    }
    this.panelistManagementService.setFeedback(body).subscribe(
      data => {
        if(data.success == false) {

        }
        else{
          this.panelistManagementService.listInterviewPanelist(this.currentEvent /*Change*/).subscribe(
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
         

        }
      }
    )

  }
    
      
    
    setSelectionStatus(event:Event){


      if((event.target as HTMLInputElement).value != ''){
    console.log((event.target as HTMLInputElement).value)
    const data = (event.target as HTMLInputElement).value
   this.candidateSelectionStatus = data.split("#");
   this.submitFeedbackButtonDisabled = false;
      }
      else{
        this.submitFeedbackButtonDisabled = true;
      }
  




    }

    changeEventDay(event:Event){
      console.log((event.target as HTMLInputElement).value)

      var eventanddate = ((event.target as HTMLInputElement).value).split("#");

      const currEvent = eventanddate[0];
      const currDate = eventanddate[1];
      this.currentEvent = currEvent
      this.addPanelistForm.get('interviewRound')?.setValue(this.currentEvent)
      this.currentDate = currDate

        this.panelistManagementService.listInterviewPanelist(this.currentEvent /*Change*/).subscribe(
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
    

      

    }

    abc(event:Event){
      console.log((event.target as HTMLInputElement).value)
      localStorage.setItem("drive_id",((event.target as HTMLInputElement).value).split("#")[0]);

      localStorage.setItem("drive_name",((event.target as HTMLInputElement).value).split("#")[1]);
      this.drive_name = localStorage.getItem('drive_name') || "";
      this.ngOnInit();
  }

    getStaticData() {
      this.panelistManagementService.getStaticData().subscribe(
        data => {
          if(data.success == false){

          }
          else{
            console.log(data.data);
            this.addPanelistData = data.data
            
          }

        }
      )
      this.panelistManagementService.fetchPanelistForAddPanelist(this.currentEvent).subscribe

        (      data => {
          if(data.success == false){

          }
          else{
            this.getPanelistNames = data.data;
            // console.log(this.getPanelistNames[0].person_name+);
            
          }
       
      }
)
      this.panelistManagementService.fetchUsersForAddCoordinators().subscribe(

        data => {
          if(data.success == false){

          }
          else{

            this.getUserNames = data.data;

          }
        }

      )

    
   

  }

  addPanelist(event:Event){
    
    var panelist = (event.target as HTMLInputElement).value;

    if(this.panelistToPanel.indexOf(panelist) == -1 && panelist != 'Select'){
    this.panelistToPanel.push(panelist);
    }

  }

  removePanelist(event:Event){

    this.panelistToPanel = this.panelistToPanel.filter((panelist) => {
      return panelist != (event.target as  HTMLInputElement).value
    })
  }
  addCoordinator(event: Event){
    var coordinator = (event.target as HTMLInputElement).value;

    if(this.coordinatorToPanel.indexOf(coordinator) == -1 && coordinator != 'Select'){

      this.coordinatorToPanel.push(coordinator);
    }

  }
  removeCoordinator(event:Event){
    
    this.coordinatorToPanel = this.coordinatorToPanel.filter( (coordinator) => {

      return coordinator!= (event.target as HTMLInputElement).value;
    })

  }

  addPanelistToPanel() {

    const body = {
      drive_id : localStorage.getItem('drive_id'),
      panel_title: this.addPanelistForm.get('panelTitle')?.value,
      panelist: this.panelistToPanel,
      coordinator: this.coordinatorToPanel,
      description: "",
      interview_round: this.addPanelistForm.get('interviewRound')?.value
    }
    
    this.panelistManagementService.addPanelistToPanel(body).subscribe(
      data => {
        if (data.success == false){

        }
        else{

          this.refreshAccordions()
          this.panelistToPanel = [];
          this.coordinatorToPanel = [];
        }
      }
    )
    

  }

  refreshAccordions(){
   
      this.panelistManagementService.listInterviewPanelist(this.currentEvent /*Change*/).subscribe(
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
  
  
  }
  clearData(){
    this.panelistToPanel = [],
    this.coordinatorToPanel = []
  }

  getCandidates(){

   //FIRST STEP FETCH CANDIDATES
   // ADD THAT MANY FORM CONTROLS
   console.log(<FormArray>this.addCandidate.get('candidateData'))
   

   for(var i = 0 ; i < this.selectedCandidates.length ; i++){

   
    const group = new FormGroup({
      'name' : new FormControl({value: this.selectedCandidates[i].candidate_name,disabled: true},Validators.required),
      'panelist': new FormControl(null,Validators.required),
      'startTime': new FormControl(null, [Validators.required,Validators.pattern(/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i)]),
      'endTime': new FormControl(null,[Validators.required,Validators.pattern(/^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i)])

    });
  

  (<FormArray>this.addCandidate.get('candidateData')).push(group)
    
   }
   console.log(<FormArray>this.addCandidate.get('candidateData'))
 
   
  }
  getCandidatesControls(){

    return(<FormArray>this.addCandidate.get('candidateData')).controls

  }
  closeAddCandidates(){
    this.addCandidate = new FormGroup ({
      'candidateData' : new FormArray([])
    })
  }
  saveAddCandidates(){
    // {
    //   interview_round,
    //   drive_id,
    //   interview_date,
    //   candidate_list : [
    //     {email : '',
    //     interview_time,
    //     panel
    //    }
    //   ]
    // }

    // var interview_round  = this.currentEvent
    // var date = this.currentDate
    // var driveID = localStorage.getItem('drive_id')!;
    var body= {
      'interview_round': this.currentEvent,
      'interview_date': this.currentDate,
      'drive_id' : localStorage.getItem('drive_id'),
      'candidate_list':Array<any>()
    };

    for(var i = 0 ; i < this.selectedCandidates.length ; i++){
      var obj = {
        'email':this.selectedCandidates[i].email,
        'interview_time': <FormArray>this.addCandidate.get(['candidateData',i,'startTime'])?.value + "-"+ <FormArray>this.addCandidate.get(['candidateData',i,'endTime'])?.value,
        'panel':<FormArray>this.addCandidate.get(['candidateData',i,'panelist'])?.value
        
    }
    body.candidate_list.push(obj)

  }
  console.log(body);

  this.panelistManagementService.addCandidateToPanel(body).subscribe(
    data =>{
      if(data.success == false){

      }
      else{
        console.log(data);
      }
    }
  )

  }
}


