import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { UserElementsLibaryService } from 'src/app/shared/services/user-elements-libary.service';
import { ThumbnailSlideComponent } from 'src/app/shared/components/thumbnail-slide/thumbnail-slide.component';
import { ImageFile } from 'src/app/shared/interfaces/image-file';

@Directive({
    selector: '[appUserElementsLibaryFactory]',
})
export class UserElementsLibaryFactoryDirective implements OnInit {

    private thumbnailSlideComponentFactory: ComponentFactory<ThumbnailSlideComponent> = this.componentFactoryResolver.resolveComponentFactory(ThumbnailSlideComponent);
    private thumbnailSlideComponentRef: ComponentRef<ThumbnailSlideComponent>;

    constructor(
        private viewConainerRef: ViewContainerRef,
        private userElementsLibaryService: UserElementsLibaryService,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.watchOnAddElementToUserLibary();
        this.watchRemoveElementFromUserLibary();
    }

    private watchOnAddElementToUserLibary(): void {
        this.userElementsLibaryService.onAddElementToUserLibary$.subscribe((element: ImageFile) => {
            this.thumbnailSlideComponentRef = this.viewConainerRef.createComponent(this.thumbnailSlideComponentFactory);
            this.thumbnailSlideComponentRef.instance.element = element;
        });
    }

    private watchRemoveElementFromUserLibary(): void {
        this.userElementsLibaryService.onRemoveElementToUserLibary$.subscribe((id: number) => {
            this.viewConainerRef.remove(id - 1);
        });
    }
}
