import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';

@Injectable()

export class panelistManagementService {

    drive_id!: string

    constructor(private http: HttpClient){

        this.drive_id = localStorage.getItem('drive_id')!;
    }

    getEventDays(){
        this.drive_id = localStorage.getItem('drive_id')!;

        const params = new HttpParams()
        .set("drive_id",this.drive_id)//Change


        return this.http.get<any>("https://hakvaj3wya.execute-api.ap-south-1.amazonaws.com/dev/list_interview_rounds",{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }
   
   

 
    listInterviewPanelist (Interview_round:string){
        this.drive_id = localStorage.getItem('drive_id')!;

        console.log(Interview_round)
        const params = new HttpParams()
        .set("drive_id",this.drive_id) //Change
        .set("interview_round",Interview_round)
        console.log(Interview_round)

        return this.http.get<any>("https://hakvaj3wya.execute-api.ap-south-1.amazonaws.com/dev/list_interview_panel",
        {
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }


    distributeCandidates (body: Object){

        
        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });
        
     

        const httpOptions = {
            headers: headers_object
        }
        return this.http.put<any>("https://hakvaj3wya.execute-api.ap-south-1.amazonaws.com/dev/distribute_candidates",body, httpOptions)

    }


    listCandidatesInPanel(panel_title:string, interview_round:string){
        this.drive_id = localStorage.getItem('drive_id')!;
        const params = new HttpParams()
        .set("drive_id","98ded190-eaf2-4cf2-be36-30ea00ce189c") //Change
        .set("panel_title",panel_title)//Change
        .set("interview_round",interview_round)
      
        return this.http.get<any>("https://hakvaj3wya.execute-api.ap-south-1.amazonaws.com/dev/list_candidates_in_panel",
        {
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }
    getStaticData(){
        
        return this.http.get<any>("https://1fnflkqtpc.execute-api.ap-south-1.amazonaws.com/dev/hdmt/get_static_data",{
            headers: new HttpHeaders({'Content-Type' : 'application/json'})

        })

    }
    fetchPanelistForAddPanelist(interviewRound:string){
        this.drive_id = localStorage.getItem('drive_id')!;
        const params = new HttpParams()
        .set("drive_id","98ded190-eaf2-4cf2-be36-30ea00ce189c")
        .set("interview_round",interviewRound)

        return this.http.get<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/list_available_panelist",
        {
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });


    }
}