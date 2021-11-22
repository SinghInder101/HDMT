import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';

@Injectable()

export class managePanelistService{

listPanelistAPI!:String;

drive_id!:string

page_no!:string

page_limit!:string

    constructor(private http: HttpClient)
    {
        this.listPanelistAPI = "https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/list_panelist"
        this.drive_id = localStorage.getItem("drive_id")!;

    }

    listPanelist(){

        const params = new HttpParams()
        .set("drive_id", this.drive_id)
        .set("page_no","1")
        .set("page_limit","10")


        return this.http.get<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/list_panelist",{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }


}