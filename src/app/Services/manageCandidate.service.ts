import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
@Injectable()

export class manageCandidateService{
getCandidateAPI!: string
uploadCandidateAPI!:string
public page_no!: string;
public page_limit!:string;
public drive_id!:string;
public candidate_file!:File


constructor (private http:HttpClient){

    this.getCandidateAPI = 'https://39ik2z1q63.execute-api.ap-south-1.amazonaws.com/dev/list_candidates';
    this.uploadCandidateAPI = 'https://5b6wd723qf.execute-api.ap-south-1.amazonaws.com/dev/hdmt-import-candidates';
    this.page_no = '1';
    this.page_limit = '50';
  
    this.drive_id = localStorage.getItem('drive_id')!;

}

getCandidates(){

    const params = new HttpParams()
    .set('drive_id', "98ded190-eaf2-4cf2-be36-30ea00ce189c")
    .set('page_no', '1')
    .set('page_limit','68')

    return this.http.get<any>(this.getCandidateAPI , { headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")}) , params })

}
uploadCandidates () {

    

    let formData = new FormData();

    formData.append('file',this.candidate_file,'adsadsdad');
    formData.append('drive_id',"98ded190-eaf2-4cf2-be36-30ea00ce189c")


    return this.http.post<any>(this.uploadCandidateAPI,formData,
        { 
        headers: new HttpHeaders({ 'Content-Type':'multipart/form-data',
    'Authorization': "Bearer "+ localStorage.getItem("token")})
   
        })

}
    
}