import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasPage } from './cosas.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lindas', component: CosasPage, data: { cosasType: 'lindas' } },
      { path: 'feas', component: CosasPage, data: { cosasType: 'feas' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasPageRoutingModule {}
