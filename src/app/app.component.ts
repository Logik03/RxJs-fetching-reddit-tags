import { Component } from '@angular/core';
import { Observable, BehaviorSubject, interval, of, fromEvent, Subject } from 'rxjs';
import { take, map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'rxjs';
  searchSubject$ = new Subject<string>();
  results$: any;
  searchString = '';


  ngOnInit () {
    this.results$ = this.searchSubject$
    .pipe(
      debounceTime(200),
      switchMap(searchString => this.queryAPI(searchString))
    )
    
   /*  const letters$ = of('a', 'b', 'c', 'd', 'e');
    const numbers$ = interval(1000);


    letters$
    .pipe(
      switchMap( x => 
        numbers$
          .pipe(
            take(10),
            map(i => i + x),
          )
      )

    ).subscribe(x => console.log(x)); */
  }

  inputChanged($event:any) {
    console.log('input changed', $event)
    this.searchSubject$.next($event);
  }

  queryAPI(searchString:any) {
    console.log('queryAPI', searchString);
    return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`).pipe(
      map((result: any) => result['data']['children'])
    )
  }
  ngOnDestroy() {
    
  }
}


/*  numbers$
    .pipe(
      take(10),
      map(x => x * 10),
      filter(x => x % 3 == 0)
      //filter(x => x > 20) // this is just another example of me playing with the filter operator
    )
    .subscribe(x => console.log(x)); */
