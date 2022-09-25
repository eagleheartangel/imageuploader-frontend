import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ImagesService } from '../images.service';
import { paginateStyleService } from 'src/app/main/services/paginateStyleService';
import { NotificationService } from 'src/app/main/services/notification.service';

import { NotificationModalInterface } from 'src/app/main/interfaces/notificationModal.interface';
import { ImageInterface } from 'src/app/main/interfaces/image.interface';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mainimages',
  templateUrl: './mainimages.component.html',
  styleUrls: ['./mainimages.component.css'],
})
export class MainimagesComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChildren('pages', { read: ElementRef }) pages!: QueryList<ElementRef>;
  prevPage!: number;
  nextPage!: number;
  page!: number;
  totalPages!: number;
  numberPages!: number[];

  images!: ImageInterface[];
  url!: string;
  imageId!: string;

  showHide: boolean = false;
  data: boolean = true;
  loader: boolean = false;
  confirmation: boolean = false;

  faTrashCan = faTrashCan;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imagesService: ImagesService,
    private paginateStyle: paginateStyleService,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe((params: Params) => {
      var page = parseInt(params['page']);
      if (!page) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.page = page;
      this.getImages(page);
      setTimeout(() => {
        this.paginateStyle.setData(page, this.pages);
      }, 1000);
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Getting paginated images
  getImages(page = 1) {
    this.loader = true;
    this.imagesService
      .getImages(page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res.images.length == 0) {
            this.data = false;
            this.router.navigate(['/images/1']);
            return;
          }
          this.data = true;
          this.images = res.images;
          this.setPagination(res, page);
          this.loader = false;
        },
        error: (err) => {
          const msg = err.error.message || 'There is an error with database!';
          const data: NotificationModalInterface = {
            title: 'Ohhh no!',
            description: `${msg}`,
            color: 'secondary',
          };
          this.notification.modal(data);
        },
      });
  }

  // Pagination logic
  setPagination(res: any, page: number) {
    this.totalPages = res.totalPages;
    const numberPages = [];
    for (var i = 1; i <= this.totalPages; i++) {
      numberPages.push(i);
    }
    this.numberPages = numberPages;
    page >= 2 ? (this.prevPage = page - 1) : (this.prevPage = 1);
    page < this.totalPages
      ? (this.nextPage = page + 1)
      : (this.nextPage = this.totalPages);
  }

  // image modal
  showModal(url: string): void {
    this.url != url ? (this.showHide = true) : (this.showHide = !this.showHide);
    this.url = url;
  }

  closeModal(): void {
    this.showHide = false;
  }

  // delete images
  confirm(id: string) {
    this.confirmation = true;
    this.imageId = id;
  }

  event() {
    this.confirmation = false;
    this.deleteImage(this.imageId);
  }

  closeConfirm() {
    this.confirmation = false;
  }

  deleteImage(id: string) {
    this.loader = true;
    this.imagesService
      .deleteImage(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.loader = false;
          this.getImages(this.page);
          const data: NotificationModalInterface = {
            title: 'Good!',
            description: `${res.message}`,
            color: 'primary',
          };
          this.notification.modal(data);
        },
        error: (err) => {
          const msg = err.error.message || 'It seems to be an error!';
          const data: NotificationModalInterface = {
            title: 'Ohhh no!',
            description: `${msg}`,
            color: 'secondary',
          };
          this.notification.modal(data);
        },
      });
  }
}
