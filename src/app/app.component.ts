import { Component } from '@angular/core';
import { NotificationService } from './main/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  modalState$ = this.notification.modalState$;

  constructor(private notification: NotificationService) {}
}
