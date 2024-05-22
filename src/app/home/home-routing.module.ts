import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserPhotosComponent } from './components/user-photos/user-photos.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'user-photos',
    component: UserPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
