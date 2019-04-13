import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef, EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ThumbnailSlideComponent } from 'src/app/shared/components/thumbnail-slide/thumbnail-slide.component';
import * as uuid from '../../../../../node_modules/uuid';
import { ActionsService } from 'src/app/shared/services/actions.service';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: [ './section.component.scss' ],
})
export class SectionComponent implements OnInit {

    @ViewChild('thumbnailDropZone', { read: ViewContainerRef }) public thumbnailDropZone: ViewContainerRef;
    @Input() private id = uuid();
    public columnID: number;
    public onRemoveSection$: EventEmitter<number> = new EventEmitter<number>();


    private thumbnailSlideComponentFactory: ComponentFactory<ThumbnailSlideComponent> = this.componentFactoryResolver.resolveComponentFactory(ThumbnailSlideComponent);
    private thumbnailSlideComponentRef: ComponentRef<ThumbnailSlideComponent>;
    private thumbnailSlideList: ThumbnailSlideComponent[] = [];

    constructor(
        private actionsService: ActionsService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.actionsService.onDropID$.subscribe((data: { sectionID: string, slideID: string, idInColumn: number }) => {
            const filteredThumbnailSlideList = this.thumbnailSlideList.find((slide: ThumbnailSlideComponent) => {
                return slide.id === data.slideID;
            });
            if (this.id !== data.sectionID && filteredThumbnailSlideList) {
                this.thumbnailSlideList = this.thumbnailSlideList.filter((slide: ThumbnailSlideComponent) => {
                    return slide.id !== data.slideID;
                });
                this.thumbnailDropZone.remove(data.idInColumn);
            }
        });
    }

    public drop(event: DragEvent): void {
        const data: { id: string, idInColumn: string, buffer: string | ArrayBuffer } = JSON.parse(event.dataTransfer.getData('string'));
        this.actionsService.onDropID$.next({ sectionID: this.id, idInColumn: +data.idInColumn, slideID: data.id });
        this.insert(data);
    }

    public insert(data: { id: string, buffer: string | ArrayBuffer}): void {
        const isComponentAlreadyInSection = this.thumbnailSlideList.find((thumbnail: ThumbnailSlideComponent) => {
            return thumbnail.buffer === data.buffer;
        });

        if (!isComponentAlreadyInSection) {
            this.thumbnailSlideComponentRef = this.thumbnailDropZone.createComponent(this.thumbnailSlideComponentFactory);
            this.thumbnailSlideComponentRef.instance.id = data.id;
            this.thumbnailSlideComponentRef.instance.idInColumn = this.thumbnailDropZone.length - 1;
            this.thumbnailSlideComponentRef.instance.buffer = data.buffer;
            this.thumbnailSlideList.push(this.thumbnailSlideComponentRef.instance);
        }
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
    }

    public removeSection(): void {
        this.onRemoveSection$.emit(this.columnID);
    }
}
