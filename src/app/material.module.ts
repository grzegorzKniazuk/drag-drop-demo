import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        DragDropModule,
    ],
    exports: [
        BrowserAnimationsModule,
        DragDropModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class MaterialModule {
}
