import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { SectionComponent } from 'src/app/shared/components/section/section.component';

@Injectable({
    providedIn: 'root',
})
export class SectionService {

    private sectionComponentFactory: ComponentFactory<SectionComponent> = this.componentFactoryResolver.resolveComponentFactory(SectionComponent);
    private sectionComponentRef: ComponentRef<SectionComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    public addSection(viewContainerRef: ViewContainerRef): void {
        this.sectionComponentRef = viewContainerRef.createComponent(this.sectionComponentFactory);
        this.sectionComponentRef.instance.columnID = viewContainerRef.length - 1;

        this.sectionComponentRef.instance.onRemoveSection$.subscribe((columnID: number) => {
            viewContainerRef.remove(columnID);
        });
    }
}
