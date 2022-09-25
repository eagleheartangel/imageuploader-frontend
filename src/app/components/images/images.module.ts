import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images.routing';
import { SharedModule } from 'src/app/main/shared/shared.module';

import { MainimagesComponent } from './mainimages/mainimages.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  TimeagoModule,
  TimeagoFormatter,
  TimeagoCustomFormatter,
} from 'ngx-timeago';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { ConfirmationmodalComponent } from './confirmationmodal/confirmationmodal.component';

@NgModule({
  declarations: [MainimagesComponent, ConfirmationmodalComponent],
  imports: [
    ImagesRoutingModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl },
      formatter: {
        provide: TimeagoFormatter,
        useClass: TimeagoCustomFormatter,
      },
    }),
  ],
})
export class ImagesModule {
  constructor(intl: TimeagoIntl) {
    intl.strings = englishStrings;
    intl.changes.next();
  }
}
