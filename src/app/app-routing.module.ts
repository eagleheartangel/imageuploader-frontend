import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'images',
    loadChildren: () =>
      import('./components/images/images.module').then((m) => m.ImagesModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./components/upload/upload.module').then((m) => m.UploadModule),
  },
  { path: '**', redirectTo: '/images/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
