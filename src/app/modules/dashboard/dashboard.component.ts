import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SectionService } from 'src/app/shared/services/section.service';;
import { ActionsService } from 'src/app/shared/services/actions.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements AfterViewInit {

    @ViewChild('sectionContainer', { read: ViewContainerRef }) public sectionContainer: ViewContainerRef;

    constructor(
        private sectionService: SectionService,
        private actionsService: ActionsService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public ngAfterViewInit(): void {
        this.actionsService.onAddSection$.pipe(
            filter((data: { columnID: number, onRemove: boolean }) => !!data && !data.onRemove),
        ).subscribe(() => {
            this.sectionService.addSection(this.sectionContainer);
        });
        this.changeDetectorRef.detectChanges();
    }
}
