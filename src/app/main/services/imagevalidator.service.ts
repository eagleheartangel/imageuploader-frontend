import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagevalidatorService implements AsyncValidator {
  constructor() {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const extensions: any = {
      'image/jpeg': true,
      'image/jpg': true,
      'image/png': true,
      'image/gif': true,
    };
    var result = extensions[control.value.type] || false;
    return of(result == true ? null : { invalidImage: true });
  }
}
