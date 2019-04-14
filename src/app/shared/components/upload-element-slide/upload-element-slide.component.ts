import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as uuid from '../../../../../node_modules/uuid';

@Component({
    selector: 'app-upload-element-slide',
    templateUrl: './upload-element-slide.component.html',
    styleUrls: [ './upload-element-slide.component.scss' ],
})
export class UploadElementSlideComponent {

    @Input() private columnID: string;
    @Output() public onUpload$: EventEmitter<{ id: string, columnID: string, buffer: string | ArrayBuffer }> = new EventEmitter<{ id: string, columnID: string, buffer: string | ArrayBuffer }>();
    @ViewChild('labelElement') private labelElement: ElementRef;

    public clickIntoLabel(): void {
        this.labelElement.nativeElement.click();
    }

    public uploadFile(event: any): void {
        const files: FileList = event.target.files || event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type.match('image')) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files.item(i));

                fileReader.onloadend = () => {
                    const imageBuffer = fileReader.result;
                    this.onUpload$.emit({ id: uuid(), columnID: this.columnID, buffer: imageBuffer });
                };
            } else {
                alert('Wrzuć JPG/PNG');
            }
        }
    }
}
