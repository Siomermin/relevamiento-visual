import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('auth/login') },
  },
  {
    path: 'cosas',
    loadChildren: () =>
      import('./cosas/cosas.module').then((m) => m.CosasPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('auth/login') },
  },
  {
    path: 'graficos',
    loadChildren: () =>
      import('./charts/charts.module').then((m) => m.ChartsModule),
     canActivate: [AuthGuard],
     data: { authGuardPipe: () => redirectUnauthorizedTo('auth/login') },
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
