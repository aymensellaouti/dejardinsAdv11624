import { Component, NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TodoComponent } from './todo/todo/todo.component';
import { MiniWordComponent } from './directives/mini-word/mini-word.component';
import { ColorComponent } from './components/color/color.component';
import { FrontComponent } from './templates/front/front.component';
import { AdminComponent } from './templates/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { NF404Component } from './components/nf404/nf404.component';

import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { CvComponent } from './cv/cv/cv.component';
import { DetailsCvComponent } from './cv/details-cv/details-cv.component';
import { RhComponent } from './optimizationPattern/rh/rh.component';
import { authGuard } from './auth/guards/auth.guard';
import { MasterDtailsCvComponent } from './cv/master-dtails-cv/master-dtails-cv.component';
import { detailCvResolverResolver } from './cv/resolver/detail-cv-resolver.resolver';
import { masterDetailsResolver } from './cv/resolver/master-details-resolver.resolver';
import { SliderComponent } from './rxjs/slider/slider.component';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'rh', component: RhComponent },
  { path: 'slider', component: SliderComponent },
  {
    path: 'cv',
    component: CvComponent,
  },
  {
    path: 'cv/list',
    // Tu ne peux router vers la page cv/list
    //  que si le resolver qui s'appelle masterDetailsResolver
    // récupérer la liste des cvs
    // Cette liste la on va pouvoir la récupérer dans
    // une propriété data avec clé cvs
    resolve: {
      cvs: masterDetailsResolver,
    },
    component: MasterDtailsCvComponent,
    children: [
      {
        path: 'details/:id',
        component: DetailsCvComponent,
        resolve: {
          cv: detailCvResolverResolver,
        },
      },
    ],
  },
  { path: 'cv/add', component: AddCvComponent, canActivate: [authGuard] },
  {
    path: 'cv/:id',
    component: DetailsCvComponent,
    resolve: {
      cv: detailCvResolverResolver,
    },
  },
  {
    path: '',
    component: FrontComponent,
    children: [
      { path: 'todo', component: TodoComponent },
      { path: 'word', component: MiniWordComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'color', component: ColorComponent }],
  },
  { path: '**', component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes
  //   , {
  //   enableTracing: true,
  // }
)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
