import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { ThumbnailSlideComponent } from 'src/app/shared/components/thumbnail-slide/thumbnail-slide.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnDestroy {

    @ViewChild('userUpladColumn', { read: ViewContainerRef }) public userUpladColumn: ViewContainerRef;
    @ViewChild('firstDropColumn', { read: ViewContainerRef }) public firstDropColumn: ViewContainerRef;

    private thumbnailSlideComponentFactory: ComponentFactory<ThumbnailSlideComponent> = this.componentFactoryResolver.resolveComponentFactory(ThumbnailSlideComponent);
    private thumbnailSlideComponentRef: ComponentRef<ThumbnailSlideComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    public ngOnDestroy(): void {
    }

    public firstColumn: ThumbnailSlideComponent[] = [];
    public secondColumn: ThumbnailSlideComponent[] = [];

    public uploadFile(event: any): void {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);

        fileReader.onload = () => {
            const imageBuffer = fileReader.result;
            this.thumbnailSlideComponentRef = this.userUpladColumn.createComponent(this.thumbnailSlideComponentFactory);
            this.thumbnailSlideComponentRef.instance.id = 0;
            this.thumbnailSlideComponentRef.instance.buffer = imageBuffer;
            this.firstColumn.push(this.thumbnailSlideComponentRef.instance);

            this.thumbnailSlideComponentRef.instance.onRemoveSlide$.subscribe((id: number) => {
                console.log('v');
                this.firstDropColumn.remove(id);
            });
        };
    }

    public drop(event: DragEvent): void {
        const data = event.dataTransfer.getData('string');
        this.thumbnailSlideComponentRef = this.firstDropColumn.createComponent(this.thumbnailSlideComponentFactory);
        this.thumbnailSlideComponentRef.instance.id = +data;
        this.thumbnailSlideComponentRef.instance.buffer = this.firstColumn[+data].buffer;
        this.secondColumn.push(this.thumbnailSlideComponentRef.instance);
        this.userUpladColumn.remove(+data);
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
    }
}
