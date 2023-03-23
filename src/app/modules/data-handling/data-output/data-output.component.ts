import { Component } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr.service';
import { RequestsHandlerService} from 'src/app/services/requests-handler.service';
import { taskStatusButtons } from '../../../utils/Buttons';
import { Router } from '@angular/router';
import { dataUrl} from 'src/app/utils/environment';

@Component({
  selector: 'app-data-output',
  templateUrl: './data-output.component.html',
  styleUrls: ['./data-output.component.css']
})
export class DataOutputComponent {
  taskStatuses=taskStatusButtons;
  TasksFetched:any=[];
  ArrayofIds:any=[];
  editToggle:any=[];
  dataUrl=dataUrl
  constructor(private route:Router,private toastr:ToastrService,private httpHandler:RequestsHandlerService){
   if(localStorage.getItem('token')){
    this.tableData();
   }
   else{
    route.navigateByUrl('/login')
   }

  }
  tableData(){
    this.httpHandler.getTasks().subscribe((response:any)=>{
      this.toastr.emitSuccess('Data Fetched Successfully !')
      this.TasksFetched=response.datas
      console.log(response.datas)
      this.editToggle=Array(this.TasksFetched.length).fill(0)
    },()=>{this.toastr.emitError('Some Error Occured !')})
  }
  statusChanged(valueChanged:any,dataId:any,localIndex:number){

    const data=new FormData()
    data.append('taskstatus',valueChanged.value)
      this.httpHandler.PostUpdates(data,dataId).subscribe((response:any)=>{
        this.toastr.emitSuccess(`Status Updated Successfully !`)
        this.TasksFetched[localIndex].taskstatus=Number(valueChanged.value);

      },
      ()=>this.toastr.emitError(`Some Error Occurred !`)
      )

    }

  deleteTasks(index:any,_id:any){
    this.httpHandler.deleteTasks(_id).subscribe(()=>{
      this.toastr.emitSuccess(`Successfully Deleted`)
      this.TasksFetched.splice(index,1)
    },()=>this.toastr.emitError(`Some Error Occurred !`))
  }
  editTasks(id:number){
   if(this.editToggle[id]===1){
      this.editToggle[id]=0;
   }
   else{
      this.editToggle[id]=1
   }
  }
  redirectRoute(dataIndex:any,_id:any){
    this.route.navigateByUrl('/update',{state:{status:true,data:{data:this.TasksFetched[dataIndex],id:_id}}});
  }
}
