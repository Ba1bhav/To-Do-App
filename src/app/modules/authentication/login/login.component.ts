import { Component } from '@angular/core';
import {Validators,FormBuilder, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RequestsHandlerService } from 'src/app/services/requests-handler.service';
import { ToastrService } from 'src/app/services/toastr.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ErrorToggle: boolean=false;
  // SignUpForm:any;
  constructor(private route :Router,private toastr:ToastrService,private httpHandler:RequestsHandlerService,private signUp:FormBuilder){

    if(localStorage.getItem('token')){
    this.route.navigateByUrl('/Dashboard')
    }
  }


logIn() {
  this.httpHandler.LogIn(this.loginForm.value)
  .subscribe((response:any)=>
  {
    this.toastr.emitSuccess('Welcome '+response?.username);
    localStorage.setItem('token',response?.token)
    this.route.navigateByUrl('/Dashboard')
  },
  (Error:any)=>{
    if(Error?.error?.error){
    this.toastr.emitError(Error?.error?.error)}
      else{
        this.toastr.emitError('Some Error Occurred')
      }
  }
  )
}
ErrorToggler(){
  this.ErrorToggle=true;
  setTimeout(()=>this.ErrorToggle=false,2000)
}
  loginForm=this.signUp.group({
  email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
  password:['',[Validators.required,Validators.minLength(8)]],
})
get __loginControls(){
  return this.loginForm?.controls
}

}
