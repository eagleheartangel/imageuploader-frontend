import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NotificationInterface } from '../interfaces/notification.interface';
import { NotificationModalInterface } from '../interfaces/notificationModal.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private renderer2!: Renderer2;
  private modalState = new BehaviorSubject<NotificationInterface>({
    showHide: false,
    title: '',
    description: '',
    color: { modal: '' },
  });
  modalState$ = this.modalState.asObservable();
  progress: number = 0;
  incrementSpeed: number = 0.2;
  data!: NotificationInterface;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  modal(data: NotificationModalInterface) {
    let modal = this.modalColor(data.color);
    this.modalState.next({
      showHide: true,
      title: data.title,
      description: data.description,
      color: { modal: modal },
    });
    setTimeout(() => {
      this.modalState.next({
        showHide: false,
        title: data.title,
        description: data.description,
        color: { modal: modal },
      });
    }, 2600);
  }

  startProgressModal(modal: ElementRef) {
    this.modalStyle(modal);
  }

  modalStyle(modal: ElementRef) {
    this.modalState$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      this.data = data;
      data.color.modal.split(' ').map((className: string) => {
        this.renderer2.addClass(modal.nativeElement, className);
      });
    });
  }

  clearStyles(modal: ElementRef) {
    this.data.color.modal.split(' ').map((className: string) => {
      this.renderer2.addClass(modal.nativeElement, className);
    });
  }

  // Select modal color
  modalColor(color: string) {
    const validate: any = {
      primary: 'bg-paletteD-two text-paletteD-four',
      secondary: 'bg-paletteD-four text-paletteD-one',
    };
    const colors = validate[color] || null;
    return colors;
  }
}
