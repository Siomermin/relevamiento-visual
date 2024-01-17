import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasPageRoutingModule } from './cosas-routing.module';

import { CosasPage } from './cosas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasPageRoutingModule,
    RouterModule,
  ],
  declarations: [CosasPage],
})
export class CosasPageModule {}
