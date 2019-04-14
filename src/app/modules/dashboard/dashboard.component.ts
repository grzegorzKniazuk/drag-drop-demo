import { Component, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SectionService } from 'src/app/shared/services/section.service';
import * as uuid from '../../../../node_modules/uuid';
import { SectionComponent } from 'src/app/shared/components/section/section.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent {

    @ViewChild('sectionContainer', { read: ViewContainerRef }) public sectionContainer: ViewContainerRef;
    @ViewChildren(SectionComponent) public sectionList: QueryList<SectionComponent>;

    constructor(
        private sectionService: SectionService,
    ) {
    }

    public addSection(): void {
        this.sectionService.addSection(this.sectionContainer);
    }

    public uploadFile(event: any): void {
        const files: FileList = event.target.files || event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type.match('image')) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files.item(i));

                fileReader.onloadend = () => {
                    const imageBuffer = fileReader.result;

                    this.sectionList.first.insert({ id: uuid(), buffer: imageBuffer });
                };
            } else {
                alert('Wrzuć JPG/PNG');
            }
        }
    }
}
