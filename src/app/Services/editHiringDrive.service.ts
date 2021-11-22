import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ThrowStmt } from "@angular/compiler";
import createHiringDrive from 'src/Interfaces/createHiringDrive';
@Injectable()

export class editHiringDriveService{

 public drive_id!:string;
 public editHiringDriveAPI: string;
 public getHiringDriveAPI: string;
 

 constructor(private http: HttpClient){
     this.editHiringDriveAPI="https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/edit_hiring_drive";
     this.getHiringDriveAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/get_hiring_drive_info"

 }

 set driveID(drive_id:string){
     this.drive_id = drive_id
 }

 getHiringDrive(){
     console.log(this.drive_id + "service")

    var headers_object = new HttpHeaders(
        {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")
        });
        const params = new HttpParams()
        .set("drive_id", this.drive_id)

      
        const httpOptions = {
            headers: headers_object
        }

        return this.http.get<any>(this.getHiringDriveAPI,{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        })

 }


 public editHiringDriveData(editedHiringDrive:createHiringDrive){

    console.log(editedHiringDrive)

    var headers_object = new HttpHeaders(
        {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")
        });
        
    
    const body ={
        drive_id:this.drive_id,
        ...editedHiringDrive
    }
    console.log(body + " Edited Hiring Drive from service")

    const httpOptions = {
        headers: headers_object
    }
    
    return this.http.put<any>(this.editHiringDriveAPI,body, httpOptions)



 }


}