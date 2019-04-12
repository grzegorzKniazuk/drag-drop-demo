import { EventEmitter, Injectable } from '@angular/core';
import { ImageFile } from 'src/app/shared/interfaces/image-file';

@Injectable({
    providedIn: 'root',
})
export class UserElementsLibaryService {

    public readonly onAddElementToUserLibary$: EventEmitter<ImageFile> = new EventEmitter<ImageFile>();
    public readonly onRemoveElementToUserLibary$: EventEmitter<number> = new EventEmitter<number>();

    public buildThumbnail(image: ImageFile): void {
        this.onAddElementToUserLibary$.emit(image);
    }

    public removeThumbnail(id: number): void {
        this.onRemoveElementToUserLibary$.emit(id);
    }
}
