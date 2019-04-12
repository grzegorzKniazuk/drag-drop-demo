import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit {

    @Input() public thumbnailSrc: string | ArrayBuffer;

    constructor() {
    }

    ngOnInit() {
    }

}
