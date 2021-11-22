import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ThrowStmt } from "@angular/compiler";

@Injectable()
export class listAllHiringDriveandIDService{

    getAllHiringDriveandIdAPI!:string
    constructor(private http:HttpClient){
        this.getAllHiringDriveandIdAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/list_hiring_drives_name"

    }


    getAllHiringDriveandId(){

        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });


            return this.http.get<any>(this.getAllHiringDriveandIdAPI,{
                headers: new HttpHeaders({'Content-Type': 'application/json',
                'Authorization': "Bearer "+ localStorage.getItem("token")})
                
            })
    }
}