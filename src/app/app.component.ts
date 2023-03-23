import { Component } from '@angular/core';
import { ToastrService } from './services/toastr.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
interface messageInterface{
  'success':boolean;
  'message':string;
  }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  Notification:messageInterface={'success':false,'message':'message/toastrMessage'};
  display=false;
  authModules:boolean=true;
  constructor(private toastr:ToastrService,private routeManager:Router){
   routeManager.events.subscribe((urlSubscribed)=>{
    if(urlSubscribed instanceof NavigationEnd){
      let currentPath=urlSubscribed.url;
      if(currentPath!=="/Dashboard"||'/AddTasks'){
        this.authModules=false
        console.log(urlSubscribed.url)
      }
   }
  })
    this.toastr.notify.subscribe((response:any)=>{
      this.Notification=response;
      this.display=true;
      setTimeout(()=>{this.display=false},2000)
  })}



  Notify(Message:messageInterface){
      this.Notification=Message;
      this.display=true;
      setTimeout(()=>{this.display=false},2000)
  }
}
