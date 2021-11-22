import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class authService{
    private loginAPI: string;
    public email: string;
    private password: string;

    constructor(private http:HttpClient){
        this.loginAPI = 'https://vppizzkib1.execute-api.ap-south-1.amazonaws.com/dev/hdmt-user-login'
        this.email = '';
        this.password = '';
    }
    set setEmail (email:string){
        this.email = email;

    }
    set setPassword (password:string){
        this.password = password;
    }

   public login(){
        const body = {username: this.email, password: this.password};

       console.log(body);
        return this.http.post<any>(this.loginAPI, body)
        
        
    }

    

}