import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PhotoChartsPage } from './pages/photo-charts/photo-charts.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    PhotoChartsPage,
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NgxChartsModule,
    IonicModule
  ]
})
export class ChartsModule { }
