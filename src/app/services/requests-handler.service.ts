import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsHandlerService {
  urlDelete='http://192.180.3.52:5000/data/delete'
  url='http://192.180.3.52:5000/data/showall'
  patchUrl='https://crud-4f82b-default-rtdb.firebaseio.com/tasks/'
  constructor(private httphandler:HttpClient) { }
  postTasks(Data:any,Headers:any){

    return this.httphandler.post('http://192.180.3.52:5000/data/newdata',Data,{headers:Headers},);
  }
  getTasks(){
    let token=localStorage.getItem('token')
    const Headers=new HttpHeaders({'token':token||''})
    return this.httphandler.get(this.url,{headers:Headers})
  }
  PostUpdates(valueChanged:any,id:any){
    return this.httphandler.patch(this.patchUrl+id+'.json',valueChanged)
  }
  deleteTasks(id:any){
      let token=localStorage.getItem('token')
      console.log(id)
      const Headers=new HttpHeaders({'token':token||'','_id':id||''})
      return this.httphandler.delete(this.urlDelete,{headers:Headers})
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
