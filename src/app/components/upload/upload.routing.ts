import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainuploadComponent } from './mainupload/mainupload.component';

const routes: Routes = [
  {
    path: '',
    component: MainuploadComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UploadRoutingModule {}
