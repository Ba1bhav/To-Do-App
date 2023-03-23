import { Component } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestsHandlerService } from 'src/app/services/requests-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { dataUrl,tokenError } from 'src/app/utils/environment';
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
  imgFile:any;
  DataPassed:any;
  dataUrl=dataUrl;
  jwtTokenError=tokenError
  constructor(
    private routeManager: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private httpHandler: RequestsHandlerService
  ) {
    if(localStorage.getItem('token')){
    this.Updateid=this._router.getCurrentNavigation()?.extras.state?.['data'].data._id;
    if (this._router.getCurrentNavigation()?.extras.state?.['status']) {
      this.DataPassed =this._router.getCurrentNavigation()?.extras.state?.['data'].data;
      console.log(this.DataPassed)
      this.InputTasks = new FormGroup({
        title: new FormControl(this.DataPassed.title, Validators.required),
        detail: new FormControl(this.DataPassed.detail, Validators.required),
        attachment: new FormControl(''),
        startdate: new FormControl(
          this.DataPassed.startdate.split('T')[0],
          Validators.required
        ),
        enddate: new FormControl(
          this.DataPassed.enddate.split('T')[0],
          Validators.required
        ),
        taskstatus: new FormControl(this.DataPassed.taskstatus),
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
        title: new FormControl('', Validators.required),
        detail: new FormControl('', Validators.required),
        attachment: new FormControl(''),
        startdate: new FormControl('', Validators.required),
        enddate: new FormControl('', Validators.required),
        taskstatus: new FormControl(0),
      });
      this.ButtonTittle = 'Add Task';
      this.Update = false;
    }
  }
  else{
    _router.navigateByUrl('/login')
  }
  }

  get InputTasksControl() {
    return this.InputTasks.controls;
  }

  Post() {
    const tokenData=localStorage.getItem('token')
    const Headers=new HttpHeaders({ 'token': tokenData || ''})
    this.Data=this.InputTasks.value
    let data = new FormData();
    if(this.imgFile){
    this.Data.attachment=this.imgFile;
    data.append('attachment', this.Data.attachment);
  }else{
    this.Data.attachment=this.DataPassed?.attachment||''
  }
    data.append('title', this.Data.title);
    data.append('detail', this.Data.detail);
    data.append('startdate', this.Data.startdate);
    data.append('enddate', this.Data.enddate);
    data.append('taskstatus',this.Data.taskstatus)
    if (this.Update == true) {

      this.httpHandler
        .PostUpdates(
          data,
         this.Updateid
        )
        .subscribe(
          () => this.toastr.emitSuccess('Successfuly Updated !'),
          () => this.toastr.emitError('Some Error Encountered')
        );
    } else {
         this.httpHandler
        .postTasks(data,Headers)
        .subscribe((response: any) => {
          this.toastr.emitSuccess('Data Added Successfully');
          this.InputTasks.reset();
        },(error: any) => {
          if(error?.error.error==this.jwtTokenError){
            localStorage.removeItem('token')
            this._router.navigateByUrl('/login')
          }
          this.toastr.emitError(error?.error.error);
        });
    }
  }
  readFileSize(FileEvent: any) {
    console.log('data:',FileEvent.srcElement.files)
    if (FileEvent.srcElement.files[0].size > 100000) {
      this.toastr.emitError('File Size Exceeds');
      FileEvent.srcElement.files[0] = null;
    } else {
        this.imgFile=FileEvent.srcElement.files[0];
        this.toastr.emitSuccess('File Validation Success');
      }

    }

  ErrorToggler(){
    this.ErrorToggle=true;
    setTimeout(()=>this.ErrorToggle=false,2000)
  }
}
