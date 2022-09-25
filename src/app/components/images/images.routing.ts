import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainimagesComponent } from './mainimages/mainimages.component';

const routes: Routes = [
  {
    path: ':page',
    component: MainimagesComponent,
  },
  { path: '**', redirectTo: ':page' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ImagesRoutingModule {}
