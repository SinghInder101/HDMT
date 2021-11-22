import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { authService } from 'src/app/Services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean 

 errorMessage: string;

loginForm!: FormGroup;
  constructor(private authService: authService, private router: Router) { 
    this.errorMessage='';
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [
        Validators.required, 
        Validators.pattern(
        '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
      )]),
      
      'password': new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ), // minimum 8 characters, both upper case and lower case, special character and number
      ]),
    });
  }
  onSubmit(){
    console.log(this.loginForm);
    console.log('hemlo')
    this.isLoading = true;
    let email = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    // console.log(email);
    // console.log(password);
    this.authService.setEmail = email;
    this.authService.setPassword = password;
    // console.log(this.authService.email)//
    
    this.authService.login().subscribe
    (data => {
      console.log(data);

     if(data.success == false){
       
       console.log('Invalid Email or Password')
       this.errorMessage = data.errorMessage;
     }

     else{
       localStorage.setItem('token' , data.token);
       console.log(localStorage.getItem('token'));
       this.router.navigate(['/home'])
     }
     this.isLoading= false;
  }
 

  );


  
  }
  

}
