import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DragDropColumnComponent } from 'src/app/dashboard/drag-drop-column/drag-drop-column.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent<T> implements OnInit {

    public itemStoreRef: ElementRef;
    @ViewChild('presentationSections', { read: ViewContainerRef }) public presentationSections: ViewContainerRef;
    private dragDropColumnComponentRef: ComponentRef<DragDropColumnComponent>;
    private dragDropColumnComponentFactory: ComponentFactory<DragDropColumnComponent> = this.componentFactoryResolver.resolveComponentFactory(DragDropColumnComponent);

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
    }

    public addSection(): void {
        this.dragDropColumnComponentRef = this.presentationSections.createComponent(this.dragDropColumnComponentFactory);

        this.dragDropColumnComponentRef.instance.onDelete.subscribe(index => {
            this.presentationSections.detach(index);
        });
    }

    public getItemStoreRef(event: ElementRef): void {
        this.itemStoreRef = event;
    }
}
