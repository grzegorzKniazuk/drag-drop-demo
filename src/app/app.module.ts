import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MaterialModule } from 'src/app/material.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        DashboardModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
