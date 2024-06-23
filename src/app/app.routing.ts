import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {AuthGuard} from "./services/auth.guard";
import { NotfoundComponent } from '/notfound/Notfound.component';

const routes: Routes =[

  { path: '**',component:NotfoundComponent}, 
  { path: '',redirectTo: 'co-transport',
    pathMatch: 'full',
  }, 
  { path: '',component: AdminLayoutComponent,
    canActivate: [AuthGuard], // Protect this route
    children: [
  { path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, 
  { path: '',component: AuthLayoutComponent,
    children: [
  { path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  { path: 'co-transport', loadChildren: () => import('./layouts/transport-layout/transport.module').then(m => m.TransportModule) }, {
    path: '**',
    redirectTo: 'co-transport'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
  providers: [AuthGuard], // Provide the guard here
})
export class AppRoutingModule { }
