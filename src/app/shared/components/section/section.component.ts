import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewRef,
} from '@angular/core';
import { ThumbnailSlideComponent } from 'src/app/shared/components/thumbnail-slide/thumbnail-slide.component';
import * as uuid from '../../../../../node_modules/uuid';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { filter, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: [ './section.component.scss' ],
})
export class SectionComponent implements OnInit, OnDestroy {

    @ViewChild('thumbnailDropZone', { read: ViewContainerRef }) public thumbnailDropZone: ViewContainerRef;
    public columnID: number;
    public onRemoveSection$: EventEmitter<number> = new EventEmitter<number>();
    @Input() private id = uuid();
    private thumbnailSlideComponentFactory: ComponentFactory<ThumbnailSlideComponent> = this.componentFactoryResolver.resolveComponentFactory(ThumbnailSlideComponent);
    private thumbnailSlideComponentRef: ComponentRef<ThumbnailSlideComponent>;
    private thumbnailSlideList: ThumbnailSlideComponent[] = [];

    constructor(
        private actionsService: ActionsService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.actionsService.onDropID$.pipe(
            filter((v) => !!v),
        ).subscribe((data: { sectionID: string, slideID: string, idInColumn: number }) => {
            const filteredThumbnailSlideList = this.thumbnailSlideList.find((slide: ThumbnailSlideComponent) => {
                return slide.id === data.slideID;
            });
            if (this.id !== data.sectionID && filteredThumbnailSlideList) {
                this.thumbnailSlideList = this.thumbnailSlideList.filter((slide: ThumbnailSlideComponent) => {
                    return slide.id !== data.slideID;
                });
                this.thumbnailDropZone.remove(data.idInColumn);
                this.recalculateIdInColumnForElements();
            }
        });
        this.actionsService.onRemoveSlide$.pipe(
            filter((v) => !!v),
        ).subscribe(({ slideID, idInColumn }: { slideID: string, idInColumn: number }) => {
            const isComponentAlreadyInSection = this.thumbnailSlideList.find((thumbnail: ThumbnailSlideComponent) => {
                return thumbnail.id === slideID;
            });

            if (isComponentAlreadyInSection) {
                this.thumbnailSlideList = this.thumbnailSlideList.filter((thumbnail: ThumbnailSlideComponent) => {
                    return thumbnail.id !== slideID;
                });
                this.thumbnailDropZone.remove(idInColumn);
                this.recalculateIdInColumnForElements();
            }
        });
    }

    public ngOnDestroy(): void {
    }

    private recalculateIdInColumnForElements() : void {
        if (this.thumbnailDropZone.length) {
            for (let i = 0; i < this.thumbnailDropZone.length; i++) {
                this.thumbnailSlideList[i].idInColumn = i;
                this.actionsService.onRealculateSlidesIDs$.next({ slideID: this.thumbnailSlideList[i].id, idInColumn: i });
            }
        } else {

        }
    }

    public drop(event: DragEvent): void {
        const data: { id: string, idInColumn: string, buffer: string | ArrayBuffer } = JSON.parse(event.dataTransfer.getData('string'));
        this.actionsService.onDropID$.next({ sectionID: this.id, idInColumn: +data.idInColumn, slideID: data.id });
        this.insert(data);
    }

    public insert(data: { id: string, buffer: string | ArrayBuffer }): void {
        const isComponentAlreadyInSection = this.thumbnailSlideList.find((thumbnail: ThumbnailSlideComponent) => {
            return thumbnail.id === data.id;
        });

        if (!isComponentAlreadyInSection) {
            this.thumbnailSlideComponentRef = this.thumbnailDropZone.createComponent(this.thumbnailSlideComponentFactory);
            this.thumbnailSlideComponentRef.instance.id = data.id;
            this.thumbnailSlideComponentRef.instance.idInColumn = this.thumbnailDropZone.length - 1;
            this.thumbnailSlideComponentRef.instance.buffer = data.buffer;
            this.thumbnailSlideList.push(this.thumbnailSlideComponentRef.instance);

            this.recalculateIdInColumnForElements();
        } else if (isComponentAlreadyInSection && this.thumbnailSlideList.length > 1) {
            this.sortElementsInColumn();
        }
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
    }

    public removeSection(): void {
        this.onRemoveSection$.emit(this.columnID);
    }

    private sortElementsInColumn(): void {
        combineLatest(
            this.actionsService.onDragStart$,
            this.actionsService.onDragEnter$,
        ).pipe(
            take(1),
        ).subscribe(([ source, target ]: { slideID: string, idInColumn: number }[]) => {

            const componentSourceViewRef: ViewRef = this.thumbnailDropZone.get(source.idInColumn);
            const componentTargetViewRef: ViewRef = this.thumbnailDropZone.get(target.idInColumn);

            const sourceIndexInArray = this.thumbnailSlideList.findIndex((component: ThumbnailSlideComponent) => {
                return component.id === source.slideID;
            });

            const targetIndexInArray = this.thumbnailSlideList.findIndex((component: ThumbnailSlideComponent) => {
                return component.id === target.slideID;
            });

            [ this.thumbnailSlideList[sourceIndexInArray].idInColumn, this.thumbnailSlideList[targetIndexInArray].idInColumn ] = [ this.thumbnailSlideList[targetIndexInArray].idInColumn, this.thumbnailSlideList[sourceIndexInArray].idInColumn ];

            this.thumbnailDropZone.move(componentSourceViewRef, target.idInColumn);
            this.thumbnailDropZone.move(componentTargetViewRef, source.idInColumn);
        });
    }
}
