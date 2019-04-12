import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-presentation-column',
  templateUrl: './presentation-column.component.html',
  styleUrls: ['./presentation-column.component.scss']
})
export class PresentationColumnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    drop(event: CdkDragDrop<(string | ArrayBuffer)[]>) {
      console.log(event);
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }
}
