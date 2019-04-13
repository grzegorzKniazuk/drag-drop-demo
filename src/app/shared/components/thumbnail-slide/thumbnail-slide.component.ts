import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit {

    @Input() public id: string;
    @Input() public idInColumn: number;
    @Input() public buffer: string | ArrayBuffer;

    constructor() {
    }

    ngOnInit() {
    }

    public dragStart(event: any): void {
        event.dataTransfer.setData('string', JSON.stringify({ id: this.id, idInColumn: this.idInColumn, buffer: this.buffer }));
    }

    public removeSlide(): void {

    }
}
