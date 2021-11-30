import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import createHiringDrive from'src/Interfaces/createHiringDrive'
@Injectable()
export class createHiringDriveService{
    private createHiringDriveData!: createHiringDrive;
    private hiringDriveAPI: string;

    constructor(private http:HttpClient){
    
        this.hiringDriveAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/create_hiring_drive";
    }
    
    public createHiringDrive(hiringDriveData:createHiringDrive){

        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });
        
        const body = hiringDriveData;

        const httpOptions = {
            headers: headers_object
        }
        
        return this.http.post<any>(this.hiringDriveAPI,body, httpOptions)
    }

    public listAllUsers(){
        var headers_object = new HttpHeaders(
            {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")
            });
            const httpOptions = {
                headers: headers_object
            }

            return this.http.get<any>('https://vppizzkib1.execute-api.ap-south-1.amazonaws.com/dev/list_admins_and_users',httpOptions)

    }


}