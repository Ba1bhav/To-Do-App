import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css'],
})
export class DataInputComponent {
  ErrorToggle:boolean=false;
  Data:any;
  InputTasks: any;
  Update: boolean = false;
  Updateid:any;
  ButtonTittle: String = 'Add Task';
  img2Base64:any;
  DataPassed:any;
  constructor(
    private routeManager: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private httpHandler: RequestsHandlerService
  ) { this.Updateid=this._router.getCurrentNavigation()?.extras.state?.['data'].id;
    // console.log(routeManager.url.subscribe((Response)=>console.log(Response[0].path)))
    if (this._router.getCurrentNavigation()?.extras.state?.['status']) {
      this.DataPassed =this._router.getCurrentNavigation()?.extras.state?.['data'].data;
      this.InputTasks = new FormGroup({
        taskTitle: new FormControl(this.DataPassed.taskTitle, Validators.required),
        taskDetail: new FormControl(this.DataPassed.taskDetail, Validators.required),
        taskAttachment: new FormControl(''),
        taskStarting: new FormControl(
          this.DataPassed.taskStarting,
          Validators.required
        ),
        taskDeadline: new FormControl(
          this.DataPassed.taskDeadline,
          Validators.required
        ),
        taskStatus: new FormControl(this.DataPassed.taskStatus),
      });
      this.Update = true;
      this.ButtonTittle = 'Update Task';
    }
    let ActivatedPath: any;
    routeManager.url.subscribe(
      (Response) => (ActivatedPath = Response[0].path)
    );
    if (ActivatedPath === 'AddTasks') {
      this.InputTasks = new FormGroup({
        taskTitle: new FormControl('', Validators.required),
        taskDetail: new FormControl('', Validators.required),
        taskAttachment: new FormControl(''),
        taskStarting: new FormControl('', Validators.required),
        taskDeadline: new FormControl('', Validators.required),
        taskStatus: new FormControl(0),
      });
      this.ButtonTittle = 'Add Task';
      this.Update = false;
    }
  }

  get InputTasksControl() {
    return this.InputTasks.controls;
  }

  Post() {
    if (this.Update == true) {
      this.httpHandler
        .PostUpdates(
          this.InputTasks.value,
         this.Updateid
        )
        .subscribe(
          () => this.toastr.emitSuccess('Successfuly Updated !'),
          () => this.toastr.emitError('Some Error Encountered')
        );
    } else {
      this.Data=this.InputTasks.value
      this.Data.taskAttachment=this.img2Base64;
      this.httpHandler
        .postTasks(this.Data)
        .subscribe((response: any) => {
          this.toastr.emitSuccess('Data Added Successfully');
          this.InputTasks = new FormGroup({
            taskTitle: new FormControl('', Validators.required),
            taskDetail: new FormControl('', Validators.required),
            taskAttachment: new FormControl(''),
            taskStarting: new FormControl('', Validators.required),
            taskDeadline: new FormControl('', Validators.required),
            taskStatus: new FormControl(0),
          });
        });
    }
  }
  readFileSize(FileEvent: any) {
    console.log('data:',FileEvent.srcElement.files)
    if (FileEvent.srcElement.files[0].size > 100000) {
      this.toastr.emitError('File Size Exceeds');
      FileEvent.srcElement.files[0] = null;
    } else {
      this.httpHandler.image2base64(FileEvent.srcElement.files[0]).then((response)=>{
        this.img2Base64=response;
        this.toastr.emitSuccess('File Validation Success');
      })

    }
  }
  ErrorToggler(){
    this.ErrorToggle=true;
    setTimeout(()=>this.ErrorToggle=false,2000)
  }
}
