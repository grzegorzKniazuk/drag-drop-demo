import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ThumbnailSlideComponent } from './components/thumbnail-slide/thumbnail-slide.component';
import { SectionComponent } from './components/section/section.component';
import { EditSlideComponent } from './components/edit-slide/edit-slide.component';
import { RouterModule } from '@angular/router';
import { KonvaModule } from 'ng2-konva';

@NgModule({
    declarations: [
        ThumbnailSlideComponent,
        SectionComponent,
        EditSlideComponent,
    ],
    entryComponents: [
        ThumbnailSlideComponent,
        SectionComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        KonvaModule,
    ],
    exports: [
        ThumbnailSlideComponent,
        SectionComponent,
    ],
})
export class SharedModule {
}
