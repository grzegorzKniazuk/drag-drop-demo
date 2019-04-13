import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/base.reducer';
import { AddColumn } from 'src/app/store/actions/presentation-columns.actions';
import { selectNumberOfpresentationColumns } from 'src/app/store/selectors/presentation-columns.selectors';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit {

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.addColumn();
    }

    public addColumn(): void {
        this.store.pipe(
            select(selectNumberOfpresentationColumns),
            take(1),
        ).subscribe((numberOfColumns: number) => {
            this.store.dispatch(new AddColumn({
                column: {
                    id: numberOfColumns,
                    slides: [],
                },
            }));
        });
    }
}
