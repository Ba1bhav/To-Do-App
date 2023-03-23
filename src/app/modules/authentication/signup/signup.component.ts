import { Component } from '@angular/core';
import {Validators,FormBuilder, AbstractControl} from '@angular/forms';
import { RequestsHandlerService } from 'src/app/services/requests-handler.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  ErrorToggle: boolean=false;
  // SignUpForm:any;
  constructor(private route:Router,private toastr:ToastrService,private httpHandler:RequestsHandlerService,private signUp:FormBuilder){
    if(localStorage.getItem('token')){
      this.route.navigateByUrl('/Dashboard')
      }

  }
Sign_Up() {
  this.httpHandler.SignUp(this.SignUpForm.value._signup)
  .subscribe((response:any)=>
  {
    this.toastr.emitSuccess('Welcome '+response?.username);
    localStorage.setItem('token',response?.token)},
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
 SignUpForm=this.signUp.group({
  _signup:this.signUp.group({
  username:['',[Validators.required,Validators.minLength(3)]],
  email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
  mobile:['',[Validators.required,Validators.minLength(10)]],
  password:['',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$')]],}),
  confirmations:this.signUp.group({confirmPassword:['',[Validators.required,]]}),
  ConfirmPassword:this.matchPasswords()
},)
matchPasswords():boolean{
  return this._signUpControls?.password?.value !== this.confirmationControls?.confirmPassword?.value
}
get _signUpControls(){
  return this.SignUpForm?.controls?._signup.controls
}
get confirmationControls(){
  return this.SignUpForm?.controls?.confirmations?.controls
}

}
