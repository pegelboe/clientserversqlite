import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumAddComponent } from './album-add/album-add.component';
import { AlbumGetComponent } from './album-get/album-get.component';


const routes: Routes = [
  {
    path: 'album/create',
    component: AlbumAddComponent
  },
  {
    path: 'albums',
    component: AlbumGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
