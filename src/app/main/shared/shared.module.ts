import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterModule } from '@angular/router';

import { ImagemodalComponent } from './components/imagemodal/imagemodal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [ImagemodalComponent, NotificationComponent, LoaderComponent],
  imports: [ClickOutsideModule, CommonModule],
  exports: [
    ImagemodalComponent,
    NotificationComponent,
    LoaderComponent,
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {}
