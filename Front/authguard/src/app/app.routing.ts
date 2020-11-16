import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';


export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
                path: 'icons',
                loadChildren: () => import('./icons/mat-icon.module').then(m => m.IconsModule)
            }
            ,
            {
                path: 'destino',
                component: ListaDestinosComponent,
            },
            {
                path: 'edit/:id',
                component: ListaDestinosComponent,
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
