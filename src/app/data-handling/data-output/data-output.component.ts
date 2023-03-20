import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
@Component({
  selector: 'app-data-output',
  templateUrl: './data-output.component.html',
  styleUrls: ['./data-output.component.css']
})
export class DataOutputComponent {
  TasksFetched:any=[];
  ArrayofIds:any=[];
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

}
