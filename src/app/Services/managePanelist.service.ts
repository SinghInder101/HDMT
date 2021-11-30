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

        this.drive_id = localStorage.getItem('drive_id')!;

        const params = new HttpParams()
        .set("drive_id",this.drive_id)//Change
        .set("page_no","1")
        .set("page_limit","10")


        return this.http.get<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/list_panelist",{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }

    listDriveDates(){

        this.drive_id = localStorage.getItem('drive_id')!;

        const params = new HttpParams()
        .set("drive_id", this.drive_id);//Change

        return this.http.get<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/get_drive_events",{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }

    listAdminsAndUsers(){

        this.drive_id = localStorage.getItem('drive_id')!;

        const params = new HttpParams()
        .set("drive_id", this.drive_id);//Change

        return this.http.get<any>("https://vppizzkib1.execute-api.ap-south-1.amazonaws.com/dev/list_admins_and_users",{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        });

    }
    
    savePanelist(email:string, phone_number:string,name:string){

        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });
        
        const body = {
            drive_id : this.drive_id,
            email: email,
            phone_number:phone_number,
            person_name: name


        }
        console.log(body);

        const httpOptions = {
            headers: headers_object
        }
        
        return this.http.post<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/add_panelist",body, httpOptions)


    }

    editPanelistStatus(body:any){
        console.log(body);

        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });
        
        

        const httpOptions = {
            headers: headers_object
        }
        
        return this.http.put<any>("https://vrikog3ugf.execute-api.ap-south-1.amazonaws.com/dev/edit_panelist",body, httpOptions)


    }

}