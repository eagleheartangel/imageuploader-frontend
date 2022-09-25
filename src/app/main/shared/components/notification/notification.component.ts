import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/main/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @ViewChild('progressModal') progressModal!: ElementRef;
  modalState$ = this.notification.modalState$;

  constructor(private notification: NotificationService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.notification.startProgressModal(this.progressModal);
  }
}
