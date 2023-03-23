import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DataHandlingModule } from './modules/data-handling/data-handling.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthenticationModule,
    DataHandlingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
