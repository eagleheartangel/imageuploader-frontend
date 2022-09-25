import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadRoutingModule } from './upload.routing';

import { MainuploadComponent } from './mainupload/mainupload.component';
import { SharedModule } from 'src/app/main/shared/shared.module';

@NgModule({
  declarations: [MainuploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploadRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class UploadModule {}
