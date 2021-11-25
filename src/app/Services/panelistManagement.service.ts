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
        .set("drive_id","98ded190-eaf2-4cf2-be36-30ea00ce189c")//Change


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
        .set("drive_id","98ded190-eaf2-4cf2-be36-30ea00ce189c") //Change
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
}