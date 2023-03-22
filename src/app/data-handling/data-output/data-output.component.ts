import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
import { taskStatusButtons } from 'src/assets/Buttons';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private route:Router,private toastr:ToastrService,private httpHandler:RequestsHandlerService){
   this.tableData();

  }
  tableData(){
    this.httpHandler.getTasks().subscribe((response:any)=>{
      this.toastr.emitSuccess('Data Fetched Successfully !')
      this.TasksFetched=response.datas
      console.log(response.datas)
    },()=>{this.toastr.emitError('Some Error Occured !')})
  }
  dataChanged(dataType:string,valueChanged:any,previousData:any,dataId:any){
    if(valueChanged.value.length<1||valueChanged.value===null||!valueChanged.value){
      this.toastr.emitError('Field can\'t be Empty')
      valueChanged.value=previousData;
    }
    else{
      this.httpHandler.PostUpdates(valueChanged.value,this.ArrayofIds[dataId]).subscribe((response:any)=>{
        this.toastr.emitSuccess(`Data of ${dataType} Successfully !`)
        console.log(response)
      },
      ()=>this.toastr.emitError(`Some Error Occurred !`)
      )

    }
    console.log(valueChanged.value)
  }
  deleteTasks(id:any,_id:any){
    this.httpHandler.deleteTasks(_id).subscribe(()=>{
      this.toastr.emitSuccess(`Successfully Deleted`)
      this.TasksFetched.pop(id)
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
  redirectRoute(id:any){
    this.route.navigateByUrl('/update',{state:{status:true,data:{data:this.TasksFetched[id],id:this.ArrayofIds[id]}}});
  }
}
