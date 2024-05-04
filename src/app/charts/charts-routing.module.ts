import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoChartsPage } from './pages/photo-charts/photo-charts.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoChartsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
