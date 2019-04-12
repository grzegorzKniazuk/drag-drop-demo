import {
    Component, ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, ElementRef,
    EventEmitter, Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ThumbnailSlideComponent } from 'src/app/dashboard/thumbnail-slide/thumbnail-slide.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-items-store',
    templateUrl: './items-store.component.html',
    styleUrls: [ './items-store.component.scss' ],
})
export class ItemsStoreComponent implements OnInit {

    private filesInStore: ThumbnailSlideComponent[] = [];
    @ViewChild('storeItems', { read: ViewContainerRef }) public storeItems: ViewContainerRef;
    @ViewChild('itemsStoreListDiv') public itemsStoreListDiv: ElementRef;
    @ViewChild('fileUploaderInput') public fileUploaderInput: ElementRef;

    public storeItemComponentFactory: ComponentFactory<ThumbnailSlideComponent> = this.componentFactoryResolver.resolveComponentFactory(ThumbnailSlideComponent);
    public storeItemComponentRef: ComponentRef<ThumbnailSlideComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {}

    public takePicture(event): void {
        if (event.target.files.length) {
            this.processImage(event.target.files[0]);
        }
    }

    public processImage(file): void {
        this.storeItemComponentRef = this.storeItems.createComponent(this.storeItemComponentFactory);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.storeItemComponentRef.instance.thumbnailSrc = reader.result;
            this.filesInStore.push(this.storeItemComponentRef.instance);
            this.fileUploaderInput.nativeElement.value = '';
        }
    }

    public onDrop(event: CdkDragDrop<ThumbnailSlideComponent[]>): void {
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
}
