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
    .set('drive_id', localStorage.getItem('drive_id')!)//Change
    .set('page_no', '1')
    .set('page_limit','68')

    return this.http.get<any>(this.getCandidateAPI , { headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem("token")}) , params })

}
uploadCandidates () {

    

    let formData = new FormData();
    console.log(this.candidate_file)
    console.log(this.candidate_file.name)

    formData.append('file',this.candidate_file,this.candidate_file.name);
    formData.append('drive_id',localStorage.getItem('drive_id')!)//Change


    return this.http.post<any>("https://wgj66rpik8.execute-api.ap-south-1.amazonaws.com/dev/import-candidates",formData,
        { 
        headers: new HttpHeaders({ 'Accept': '*/*',
    'Authorization':  localStorage.getItem("token")!})
   
        })

}
    
}