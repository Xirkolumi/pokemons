import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseComponent implements OnDestroy {
    protected destroyed$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

}