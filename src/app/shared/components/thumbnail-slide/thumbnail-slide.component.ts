import { Component, Input, OnInit } from '@angular/core';
import { ImageFile } from 'src/app/shared/interfaces/image-file';
import { AppState } from 'src/app/store/reducers/base.reducer';
import { Store } from '@ngrx/store';
import { RemoveElementFromUserLibary } from 'src/app/store/actions/user-elements-libary.actions';

@Component({
    selector: 'app-thumbnail-slide',
    templateUrl: './thumbnail-slide.component.html',
    styleUrls: [ './thumbnail-slide.component.scss' ],
})
export class ThumbnailSlideComponent implements OnInit {

    @Input() public element: ImageFile;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
    }

    public removeSlide(): void {
        this.store.dispatch(new RemoveElementFromUserLibary({ id: this.element.id }));
    }
}
