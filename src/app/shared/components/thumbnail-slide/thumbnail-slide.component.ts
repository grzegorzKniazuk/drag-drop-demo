import { Component, Input, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';

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
        private router: Router,
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

    public editSlide(): void {
        this.actionsService.onEditSlide$.next({ slideID: this.id, buffer: this.buffer });
        this.router.navigate(['dashboard', this.id, 'edit']).catch(e => console.log(e));
    }

    public dragEnter(): void {
        this.actionsService.onDragEnter$.next({ slideID: this.id, idInColumn: this.idInColumn });
    }
}
