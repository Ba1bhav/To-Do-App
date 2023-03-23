import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dataUrl ,authUrl} from '../utils/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestsHandlerService {
  constructor(private httphandler:HttpClient) { }
  postTasks(Data:any,Headers:any){
    return this.httphandler.post(`${dataUrl}newdata`,Data,{headers:Headers},);
  }
  getTasks(){
    let token=localStorage.getItem('token')
    const Headers=new HttpHeaders({'token':token||''})
    return this.httphandler.get(`${dataUrl}showall`,{headers:Headers})
  }
  PostUpdates(valueChanged:any,id:any){
      let token=localStorage.getItem('token')
      const Headers=new HttpHeaders({'token':token||'','_id':id||''})
    return this.httphandler.put(`${dataUrl}update`,valueChanged,{headers:Headers})
  }
  deleteTasks(id:any){
      let token=localStorage.getItem('token')
      console.log(id)
      const Headers=new HttpHeaders({'token':token||'','_id':id||''})
      return this.httphandler.delete(`${dataUrl}delete`,{headers:Headers})
    }
  image2base64(file:any){
    return new Promise((resolve)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file)
      reader.onload=()=>resolve(reader.result)
    })

  }
  SignUp(form_data:any){
    return this.httphandler.post(`${authUrl}/signup`,form_data)
  }
  LogIn(form_data:any){
    return this.httphandler.post(`${authUrl}/signin`,form_data)
  }
}
