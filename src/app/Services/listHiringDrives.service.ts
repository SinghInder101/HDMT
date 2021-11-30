import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import listHiringDrives from "src/Interfaces/listHiringDriveInterface";
@Injectable()

export class listHiringDriveService {

    listHiringDriveAPI: string;
    public searchTerm:string;
    searchHiringDriveAPI:String;
    
    constructor(private http:HttpClient){
        this.listHiringDriveAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/list_hiring_drives"
        this,this.searchHiringDriveAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/search_hiring_drives";
        this.searchTerm ="";
    }


    public getHiringDrives(page_no:string){

        const params = new HttpParams()
        
        .set('page_no', page_no)
        .set('page_limit',10)

        console.log(params);

       console.log(this.listHiringDriveAPI)

        return this.http.get<any>(this.listHiringDriveAPI , { headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")}) , params })


    
    }
    public searchHiringDrive(){

        const params = new HttpParams()
        .set("key_word",this.searchTerm);

        return this.http.get<any>("https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/search_hiring_drives" , { headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")}) , params })


        
    }

}