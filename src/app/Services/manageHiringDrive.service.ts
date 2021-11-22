import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';

@Injectable()

export class manageHiringDriveService{

public drive_id:string = localStorage.getItem("drive_id")!;
public getHiringDriveAPI!: string;
public getTotalAndSelectedCandidatesAPI!: string


constructor(private http: HttpClient){
    this.getHiringDriveAPI = "https://8umjtdpkq5.execute-api.ap-south-1.amazonaws.com/dev/get_hiring_drive_info"
    this.getTotalAndSelectedCandidatesAPI = "https://39ik2z1q63.execute-api.ap-south-1.amazonaws.com/dev/get_total_candidates_and_selected_candidates"
}

getHiringDrive(){
    this.drive_id = localStorage.getItem("drive_id")!;

    // var headers_object = new HttpHeaders(
    //     {
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer "+ localStorage.getItem("token")
    //     });
        const params = new HttpParams()
        .set("drive_id", this.drive_id)

      
        // const httpOptions = {
        //     headers: headers_object
        // }

        return this.http.get<any>(this.getHiringDriveAPI,{
            headers: new HttpHeaders({'Content-Type': 'application/json',
            'Authorization': "Bearer "+ localStorage.getItem("token")}),
            params
        })

    //    return this.http.post<any>(this.getHiringDriveAPI,body,httpOptions)

}


getTotalAndSelectedCandidates(){
    this.drive_id = localStorage.getItem("drive_id")!;

    const params = new HttpParams()
    .set("drive_id", '98ded190-eaf2-4cf2-be36-30ea00ce189c')

    return this.http.get<any>(this.getTotalAndSelectedCandidatesAPI,{
        headers: new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")}),
        params
    })

}


}