import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPresentationColumnFactory]'
})
export class PresentationColumnFactoryDirective {

  constructor(
      private viewContainerRef: ViewContainerRef,
  ) { }

}
