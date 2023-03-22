import { Component } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestsHandlerService } from 'src/app/requests-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
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
        title: new FormControl(this.DataPassed.title, Validators.required),
        detail: new FormControl(this.DataPassed.detail, Validators.required),
        attachment: new FormControl(''),
        startdate: new FormControl(
          this.DataPassed.startdate,
          Validators.required
        ),
        enddate: new FormControl(
          this.DataPassed.enddate,
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

  get InputTasksControl() {
    return this.InputTasks.controls;
  }

  Post() {
    const tokenData=localStorage.getItem('token')
    const Headers=new HttpHeaders({ 'token': tokenData || ''})
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
      this.Data.attachment=this.img2Base64;
      this.httpHandler
        .postTasks(this.Data,Headers)
        .subscribe((response: any) => {
          this.toastr.emitSuccess('Data Added Successfully');
          this.InputTasks = new FormGroup({
            title: new FormControl('', Validators.required),
            detail: new FormControl('', Validators.required),
            attachment: new FormControl(''),
            startdate: new FormControl('', Validators.required),
            enddate: new FormControl('', Validators.required),
            taskstatus: new FormControl(0),
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
