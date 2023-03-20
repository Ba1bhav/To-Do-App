import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsHandlerService {
  url='https://crud-4f82b-default-rtdb.firebaseio.com/tasks.json'
  constructor(private httphandler:HttpClient) { }
  postTasks(Data:any){
    return this.httphandler.post(this.url,Data);
  }
  getTasks(){
    return this.httphandler.get(this.url)
  }
}
