import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { DataInputComponent } from './modules/data-handling/data-input/data-input.component';
import { DataOutputComponent } from './modules//data-handling/data-output/data-output.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';

const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'AddTasks',component:DataInputComponent},
  {path:'update',component:DataInputComponent},
  {path:'Dashboard',component:DataOutputComponent},
  {path:'login',component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
