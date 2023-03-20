import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { FormControl, FormGroup, Validators,FormGroupDirective, } from '@angular/forms';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent {
    constructor(private toastr:ToastrService,private httpHandler:RequestsHandlerService){}

    InputTasks=new FormGroup({
    taskTitle:new FormControl('',Validators.required),
    taskDetail:new FormControl('',Validators.required),
    taskAttachment:new FormControl('',),
    taskStarting:new FormControl('',Validators.required),
    taskDeadline:new FormControl('',Validators.required)
    })
    Post(){
      this.httpHandler.postTasks(this.InputTasks.value)
      .subscribe((response:any)=>{this.toastr.emitSuccess('Data Added Successfully')})
      console.log(this.InputTasks.value)
    }
    readFileSize(FileEvent:any){
      if(FileEvent.srcElement.files[0].size>1000){
        this.toastr.emitError("File Size Exceeds")
        FileEvent.srcElement.files[0]=null
      }
      else{
        this.toastr.emitSuccess("File Validation Success")
      }
    }
}
