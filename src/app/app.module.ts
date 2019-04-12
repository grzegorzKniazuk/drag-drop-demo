import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { MaterialModule } from 'src/app/material.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { baseReducers, metaReducers } from 'src/app/store/reducers/base.reducer';
import { UserElementsLibaryEffects } from 'src/app/store/effects/user-elements-libary.effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        DashboardModule,
        StoreModule.forRoot(baseReducers, { metaReducers }),
        EffectsModule.forRoot([ UserElementsLibaryEffects ]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
