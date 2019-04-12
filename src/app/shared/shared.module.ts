import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserElementsLibaryComponent } from './components/user-elements-libary/user-elements-libary.component';
import { MaterialModule } from 'src/app/material.module';
import { ThumbnailSlideComponent } from './components/thumbnail-slide/thumbnail-slide.component';
import { UserElementsLibaryFactoryDirective } from './directives/user-elements-libary-factory.directive';
import { PresentationColumnComponent } from './components/presentation-column/presentation-column.component';
import { PresentationColumnFactoryDirective } from './directives/presentation-column-factory.directive';

@NgModule({
    declarations: [
        UserElementsLibaryComponent,
        ThumbnailSlideComponent,
        UserElementsLibaryFactoryDirective,
        PresentationColumnComponent,
        PresentationColumnFactoryDirective,
    ],
    entryComponents: [
        ThumbnailSlideComponent,
        PresentationColumnComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        UserElementsLibaryComponent,
        UserElementsLibaryFactoryDirective,
        PresentationColumnFactoryDirective,
        PresentationColumnComponent,
    ],
})
export class SharedModule {
}
