import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmationmodal',
  templateUrl: './confirmationmodal.component.html',
  styleUrls: ['./confirmationmodal.component.css'],
})
export class ConfirmationmodalComponent {
  @Output() del = new EventEmitter();
  @Output() close = new EventEmitter();

  cancel() {
    this.close.emit();
  }

  delete() {
    this.del.emit();
  }
}
