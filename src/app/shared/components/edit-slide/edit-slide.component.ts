import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { filter } from 'rxjs/operators';
import { Rectangle } from 'src/app/shared/interfaces/rectangle';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'app-edit-slide',
    templateUrl: './edit-slide.component.html',
    styleUrls: [ './edit-slide.component.scss' ],
})
export class EditSlideComponent implements AfterViewInit, OnDestroy {

    @ViewChild('canvasElement') private canvasElement: ElementRef;
    private context: CanvasRenderingContext2D;
    public slideID: string;
    public buffer: string | ArrayBuffer;
    private startCords: { x: number, y: number };
    private endCords: { x: number, y: number };
    private readonly rectangles: Rectangle[] = [];

    private canvasComponent: {
        data: string;
        rectangles: Rectangle[],
    };

    constructor(
        private actionsService: ActionsService,
    ) {
    }

    ngAfterViewInit() {
        this.context = this.canvasElement.nativeElement.getContext('2d');
        this.actionsService.onEditSlide$.pipe(
            filter(v => !!v),
        ).subscribe(({ slideID, buffer }: { slideID: string, buffer: string | ArrayBuffer }) => {
            this.slideID = slideID;
            this.buffer = buffer;
            this.fillStyle();
        });
    }

    ngOnDestroy() {
    }

    private fillStyle(): void {
        const background = new Image(1280, 720);
        background.src = <string>this.buffer;

        background.onload = () => {
            this.context.drawImage(background, 0, 0, 1280, 1280 * background.height / background.width);
        };
    }

    public mouseDown(event: MouseEvent): void {
        this.getCursorPosition(event);
        this.startCords = this.getCursorPosition(event);
    }

    public mouseUp(event: MouseEvent): void {
        this.endCords = this.getCursorPosition(event);

        if (this.startCords.x + 30 < this.endCords.x && this.startCords.y + 30 < this.endCords.y) {
            this.drawRectangle();

            this.rectangles.push({
                actionType: `action: ${this.startCords.x}`,
                topLeft: {
                    x: this.startCords.x,
                    y: this.startCords.y,
                },
                topRight: {
                    x: this.endCords.x,
                    y: this.startCords.y,
                },
                bottomLeft: {
                    x: this.startCords.x,
                    y: this.endCords.y,
                },
                bottomRight: {
                    x: this.endCords.x,
                    y: this.endCords.y,
                },
            });

            this.startCords = null;
            this.endCords = null;
        }
    }

    private getCursorPosition(event: MouseEvent): { x: number, y: number } {
        const rect = this.canvasElement.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        return { x, y };
    }

    public mouseMove(event: MouseEvent): void {
        if (this.startCords && this.endCords) {
            this.context.clearRect(this.startCords.x, this.startCords.y, this.endCords.x - this.startCords.x, this.endCords.y - this.startCords.y);
        }
        if (event.buttons) {
            this.endCords = this.getCursorPosition(event);
            this.drawRectangle();
        }
    }

    private drawRectangle(): void {
        this.context.beginPath();
        this.context.setLineDash([5, 5]);
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
        this.context.rect(this.startCords.x, this.startCords.y, this.endCords.x - this.startCords.x, this.endCords.y - this.startCords.y);
        this.context.stroke();
    }

    public save(): void {
        this.canvasComponent = {
            data: this.canvasElement.nativeElement.toDataURL('image/png'),
            rectangles: this.rectangles,
        };
        return this.canvasElement.nativeElement.toDataURL('image/png');
    }

    public click(event: MouseEvent): void {
        const { x, y } = this.getCursorPosition(event);

        for (let i = 0; i < this.rectangles.length; i++) {
            if (this.rectangles[i].topLeft.x < x && this.rectangles[i].topRight.x > x && this.rectangles[i].topLeft.y < y && this.rectangles[i].bottomLeft.y > y) {
                console.log(this.rectangles[i].actionType);
            }
        }
    }
}
