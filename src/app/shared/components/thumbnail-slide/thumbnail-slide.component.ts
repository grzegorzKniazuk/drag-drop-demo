import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit {

    @Output() public onRemoveSlide$: EventEmitter<number> = new EventEmitter<number>();
    @Input() public id: number;
    @Input() public buffer: string | ArrayBuffer;

    constructor() {
    }

    ngOnInit() {
    }

    public dragStart(event: any): void {
        event.dataTransfer.setData('string', String(this.id));
    }

    public removeSlide(): void {
        this.onRemoveSlide$.emit(this.id);
    }
}
