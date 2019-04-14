import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { filter } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit, OnDestroy {

    public id: string;
    public idInColumn: number;
    public buffer: string | ArrayBuffer;
    public onMouseEnter: boolean;

    constructor(
        private actionsService: ActionsService,
        private router: Router,
    ) {
    }

    public ngOnInit(): void {
        this.actionsService.onRealculateSlidesIDs$.pipe(
            filter((data: { slideID: string, idInColumn: number }) => data && data.slideID === this.id),
        ).subscribe((data: { slideID: string, idInColumn: number }) => {
            this.idInColumn = data.idInColumn;
        });
    }

    public ngOnDestroy(): void {
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
        this.router.navigate([ 'dashboard', this.id, 'edit' ]).catch(e => console.log(e));
    }

    public dragEnter(): void {
        this.actionsService.onDragEnter$.next({ slideID: this.id, idInColumn: this.idInColumn });
    }

    public mouseEnter(): void {
        this.onMouseEnter = true;
    }

    public mouseLeave(): void {
        this.onMouseEnter = false;
    }
}
