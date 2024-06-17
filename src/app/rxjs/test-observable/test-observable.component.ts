import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map, take } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-test-observable',
  templateUrl: './test-observable.component.html',
  styleUrls: ['./test-observable.component.css'],
})
export class TestObservableComponent implements OnDestroy {
  firstObservable$: Observable<number>;
  subcription = new Subscription();
  constructor(private toaster: ToastrService) {
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      const intervalId = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(intervalId);
        }
        observer.next(i--);
      }, 1000);
    });
    this.subcription.add(this.firstObservable$
      // 5 4 3 2 1

      .subscribe({
        next: (data) => {
          console.log(data);
        },
      }));
    // setTimeout(() => {
    this.subcription.add(this.firstObservable$
      .pipe(
        map((x) => x * 3),
        //15 12 9 6 3
        filter((x) => x % 2 == 0),
        // 12 6
        take(1)
        // 12
      )
      .subscribe({
        next: (valeur) => {
          this.toaster.info('' + valeur);
        },
        complete: () => {
          this.toaster.warning('complete count down');
        },
      }));
    // }, 3000);
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
