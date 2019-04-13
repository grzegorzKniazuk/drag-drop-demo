import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ThumbnailSlideComponent } from './components/thumbnail-slide/thumbnail-slide.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
    declarations: [
        ThumbnailSlideComponent,
        SectionComponent,
    ],
    entryComponents: [
        ThumbnailSlideComponent,
        SectionComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        ThumbnailSlideComponent,
        SectionComponent,
    ],
})
export class SharedModule {
}
