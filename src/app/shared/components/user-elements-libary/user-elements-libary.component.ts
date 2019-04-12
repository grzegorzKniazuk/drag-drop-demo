import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageType } from 'src/app/shared/enums/image-type.enum';
import { ImageFile } from 'src/app/shared/interfaces/image-file';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/base.reducer';
import { AddElementToUserLibary } from 'src/app/store/actions/user-elements-libary.actions';
import { selectNumberOfItemsInUserLibary } from 'src/app/store/selectors/user-elements-libary.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { take } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@AutoUnsubscribe()
@Component({
    selector: 'app-user-elements-libary',
    templateUrl: './user-elements-libary.component.html',
    styleUrls: [ './user-elements-libary.component.scss' ],
})
export class UserElementsLibaryComponent implements OnInit, OnDestroy {

    private imageFile: ImageFile;
    private readonly fileReader: FileReader = new FileReader();

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

    public preventDefault(event: DragEvent): void {
        event.preventDefault();
    }

    public drop(event: DragEvent): void {
        if (event.type === 'drop') {
            if (event.dataTransfer.files[0] && event.dataTransfer.files[0].type === ImageType.JPG) {
                this.fileReader.readAsDataURL(event.dataTransfer.files[0]);

                const { name, lastModified, size, type } = event.dataTransfer.files[0];

                this.store.pipe(
                    select(selectNumberOfItemsInUserLibary),
                    take(1),
                ).subscribe((totalItems: number) => {
                    this.fileReader.onload = () => {
                        this.imageFile = {
                            id: totalItems + 1,
                            name,
                            lastModified,
                            size,
                            type,
                            data: this.fileReader.result,
                        };
                        this.store.dispatch(new AddElementToUserLibary({ imageFile: this.imageFile }));
                    };
                });

            } else {
                alert('Niepoprawne rozszerzenie pliku - wrzuć JPG');
            }
            event.preventDefault();
        }
    }

}
