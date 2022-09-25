import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NotificationModalInterface } from 'src/app/main/interfaces/notificationModal.interface';
import { ImagevalidatorService } from 'src/app/main/services/imagevalidator.service';
import { NotificationService } from 'src/app/main/services/notification.service';

import { UploadService } from '../upload.service';

@Component({
  selector: 'app-mainupload',
  templateUrl: './mainupload.component.html',
  styleUrls: ['./mainupload.component.css'],
})
export class MainuploadComponent implements OnDestroy {
  private unsubsribe$ = new Subject<void>();
  image!: File;
  prevImage!: string | ArrayBuffer | null;
  loader: boolean = false;

  imageForm: UntypedFormGroup = this.formBuilder.group({
    image: ['', [Validators.required], [this.imageVal]],
    description: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
  });

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private uploadService: UploadService,
    private notification: NotificationService,
    private imageVal: ImagevalidatorService
  ) {}

  ngOnDestroy(): void {
    this.unsubsribe$.next();
    this.unsubsribe$.complete();
  }

  envErrormsg(value: string): string {
    const errors = this.imageForm.get(value)?.errors;
    if (errors?.['required']) {
      return `${value} is required`;
    } else if (errors?.['minlength']) {
      return `must be at least ${errors?.['minlength']?.requiredLength} characters`;
    } else if (errors?.['maxlength']) {
      return `must be maxium ${errors?.['maxlength']?.requiredLength} characters`;
    } else if (errors?.['invalidImage']) {
      return `invalid extention`;
    }

    return '';
  }

  isvalid(field: string) {
    return (
      this.imageForm.controls[field].invalid &&
      this.imageForm.controls[field].touched
    );
  }

  change(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.prevImage = reader.result);
      reader.readAsDataURL(this.image);
      this.imageForm
        .get('image')
        ?.setValue(this.image, { emitModelToViewChange: false });
    }
  }

  upload() {
    if (this.imageForm.invalid) {
      this.imageForm.markAllAsTouched();
      return;
    }
    this.loader = true;
    this.uploadService
      .upload(
        this.imageForm.get('image')?.value,
        this.imageForm.get('description')?.value
      )
      .pipe(takeUntil(this.unsubsribe$))
      .subscribe({
        next: (res) => {
          this.loader = false;
          this.router.navigate(['/images/1']);
          const data: NotificationModalInterface = {
            title: 'Very good!',
            description: 'The image has been uploaded!',
            color: 'primary',
          };
          this.notification.modal(data);
        },
        error: (err) => {
          this.loader = false;
          const msg =
            err.error.message || 'Make sure your image is not too large!';
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
