import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsHandlerService {
  url='https://crud-4f82b-default-rtdb.firebaseio.com/tasks.json'
  patchUrl='https://crud-4f82b-default-rtdb.firebaseio.com/tasks/'
  constructor(private httphandler:HttpClient) { }
  postTasks(Data:any,headers:any){
    return this.httphandler.post('http://192.180.3.52:5000/data/newdata',Data,headers);
  }
  getTasks(){
    return this.httphandler.get(this.url)
  }
  PostUpdates(valueChanged:any,id:any){
    return this.httphandler.patch(this.patchUrl+id+'.json',valueChanged)
  }
  deleteTasks(id:any){
      return this.httphandler.delete(this.patchUrl+id+'.json')
    }
  image2base64(file:any){
    return new Promise((resolve)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file)
      reader.onload=()=>resolve(reader.result)
    })

  }
  SignUp(form_data:any){
    return this.httphandler.post('http://192.180.3.52:5000/user/signup',form_data)
  }
  LogIn(form_data:any){
    return this.httphandler.post('http://192.180.3.52:5000/user/signin',form_data)
  }
}
