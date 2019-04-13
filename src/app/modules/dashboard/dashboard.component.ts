import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SectionService } from 'src/app/shared/services/section.service';
import * as uuid from '../../../../node_modules/uuid';
import { SectionComponent } from 'src/app/shared/components/section/section.component';

@AutoUnsubscribe()
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('sectionContainer', { read: ViewContainerRef }) public sectionContainer: ViewContainerRef;
    @ViewChildren(SectionComponent) public sectionList: QueryList<SectionComponent>;

    constructor(
        private sectionService: SectionService,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public addSection(): void {
        this.sectionService.addSection(this.sectionContainer);
    }

    public uploadFile(event: any): void {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);


        fileReader.onload = () => {
            const imageBuffer = fileReader.result;

            this.sectionList.first.insert({ id: uuid(), buffer: imageBuffer });
        };
    }
}
