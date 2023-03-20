import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
import { taskStatusButtons } from 'src/assets/Buttons';
@Component({
  selector: 'app-data-output',
  templateUrl: './data-output.component.html',
  styleUrls: ['./data-output.component.css']
})
export class DataOutputComponent {
  taskStatuses=taskStatusButtons;
  TasksFetched:any=[];
  ArrayofIds:any=[];
  editToggle:boolean=false;
  constructor(private toastr:ToastrService,private httpHandler:RequestsHandlerService){
    this.httpHandler.getTasks().subscribe((response:any)=>{
      this.toastr.emitSuccess('Data Fetched Successfully !')
      this.ArrayofIds=Object.keys(response)
      for(let id of this.ArrayofIds){
        this.TasksFetched.push(response[id])
      }
      console.log(this.TasksFetched)
    },()=>{this.toastr.emitError('Some Error Occured !')})
  }
  editTasks(){
   if(this.editToggle){
    this.editToggle=false;
   }
   else{
    this.editToggle=true;
   }
  }
}
