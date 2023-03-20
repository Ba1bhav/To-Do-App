import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInputComponent } from './data-input/data-input.component';
import { DataOutputComponent } from './data-output/data-output.component';
import { FormsModule, NgModel,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DataInputComponent,
    DataOutputComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DataHandlingModule { }
