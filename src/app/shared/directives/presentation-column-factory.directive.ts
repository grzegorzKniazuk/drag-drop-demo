import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { PresentationColumnService } from 'src/app/shared/services/presentation-column.service';
import { Column } from 'src/app/shared/interfaces/column';
import { PresentationColumnComponent } from 'src/app/shared/components/presentation-column/presentation-column.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Directive({
    selector: '[appPresentationColumnFactory]',
})
export class PresentationColumnFactoryDirective implements OnInit, OnDestroy {

    private columnComponentFactory: ComponentFactory<PresentationColumnComponent> = this.componentFactoryResolver.resolveComponentFactory(PresentationColumnComponent);
    private columnComponentRef: ComponentRef<PresentationColumnComponent>;

    constructor(
        private presentationColumnService: PresentationColumnService,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.watchAddColumns();
    }

    ngOnDestroy() {
    }

    private watchAddColumns(): void {
        this.presentationColumnService.onAddColumn$.subscribe((column: Column) => {
            console.log(column);
            this.columnComponentRef = this.viewContainerRef.createComponent(this.columnComponentFactory);
        })
    }
}
