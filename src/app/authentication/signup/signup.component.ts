import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators ,FormGroupDirective} from '@angular/forms';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
import { ToastrService } from 'src/app/toastr.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
Sign_Up() {
  this.httpHandler.SignUp(this.SignUpForm.value)
  .subscribe((response:any)=>
  { console.log(response.token);

    this.toastr.emitSuccess('SignUp Success !');
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
  SignUpForm:any;
  constructor(private toastr:ToastrService,private httpHandler:RequestsHandlerService){
    this.SignUpForm=new FormGroup({
      username:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })

  }
}
