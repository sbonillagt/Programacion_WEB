import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

//Amplify
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular'

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component'
import { MyserviceService } from './myservice.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true
};

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        AppHeaderComponent,
        SpinnerComponent,
        AppSidebarComponent,
        LoginComponent,
        AppBreadcrumbComponent,
        DestinoViajeComponent,
        ListaDestinosComponent,
        FormDestinoViajeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        //COURSERA
        ReactiveFormsModule,
        //Amplify
        AmplifyUIAngularModule

        
    ],
    providers: [
        MyserviceService,
        
        AuthGuard,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
