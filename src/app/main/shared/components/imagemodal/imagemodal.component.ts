import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.component.html',
  styleUrls: ['./imagemodal.component.css'],
})
export class ImagemodalComponent implements OnChanges {
  @Input() url!: string;
  @Output() closeModal = new EventEmitter<boolean>();
  image: boolean = true;

  ngOnChanges(value: SimpleChanges) {
    this.url = value['url'].currentValue;
  }

  close() {
    this.closeModal.emit();
  }

  onClickedOutside(e: Event) {
    this.close();
  }
}
