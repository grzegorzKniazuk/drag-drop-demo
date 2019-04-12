import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-drag-drop-column',
    templateUrl: './drag-drop-column.component.html',
    styleUrls: [ './drag-drop-column.component.scss' ],
})
export class DragDropColumnComponent implements OnInit {

    @Input() public itemStoreRef: ElementRef;
    @Input() public index: number;
    @Output() public onDelete: EventEmitter<number> = new EventEmitter<number>();
    public dragListElements: (string | ArrayBuffer)[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    public onDrop(event: CdkDragDrop<(string | ArrayBuffer)[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    public deleteSection(): void {
        this.onDelete.emit(this.index);
    }
}
