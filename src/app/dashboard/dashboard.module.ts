import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CanvasSlideComponent } from './canvas-slide/canvas-slide.component';
import { ThumbnailSlideComponent } from './thumbnail-slide/thumbnail-slide.component';
import { DragDropColumnComponent } from './drag-drop-column/drag-drop-column.component';
import { ItemsStoreComponent } from './items-store/items-store.component';
import { EditSlideComponent } from './edit-slide/edit-slide.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent,
        CanvasSlideComponent,
        ThumbnailSlideComponent,
        DragDropColumnComponent,
        ItemsStoreComponent,
        EditSlideComponent,
    ],
    entryComponents: [
        DragDropColumnComponent,
        ThumbnailSlideComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        DashboardComponent,
        CanvasSlideComponent,
        ThumbnailSlideComponent,
        DragDropColumnComponent,
        ItemsStoreComponent,
        EditSlideComponent,
    ],
})
export class DashboardModule {
}
