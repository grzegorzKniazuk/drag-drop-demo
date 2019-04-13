import { Component, Input, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit {

    @Input() public id: string;
    @Input() public idInColumn: number;
    @Input() public buffer: string | ArrayBuffer;

    constructor(
        private actionsService: ActionsService,
    ) {
    }

    ngOnInit() {
    }

    public dragStart(event: any): void {
        this.actionsService.onDragStart$.next({ slideID: this.id, idInColumn: this.idInColumn });
        event.dataTransfer.setData('string', JSON.stringify({ id: this.id, idInColumn: this.idInColumn, buffer: this.buffer }));
    }

    public removeSlide(): void {
        this.actionsService.onRemoveSlide$.next({ slideID: this.id, idInColumn: this.idInColumn });
    }

    public dragEnter(): void {
        this.actionsService.onDragEnter$.next({ slideID: this.id, idInColumn: this.idInColumn });
    }
}
