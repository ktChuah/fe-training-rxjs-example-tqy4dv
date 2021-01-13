import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  of,
  combineLatest,
  Observable,
  from,
  interval,
  BehaviorSubject,
  Subject
} from "rxjs";
import {
  delay,
  concatMap,
  map,
  filter,
  toArray,
  scan,
  reduce,
  pluck,
  takeLast,
  takeUntil,
  last
} from "rxjs/operators";
import { cloneDeep } from "lodash-es";

@Component({
  selector: "home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnDestroy, OnInit {










  constructor() {
    // imperative vs reactive
    // this.testImperative();
    // this.testReactive();
     //this.testPromise(2);
     //this.testObs(2000);
  }











  // Imperative vs reactive

  // Given a forlmula to calculate the velocity of a car which is:

  // Speed (kmh) = Distance (km) / Time (h)

  // We are required to calculate the Total time needed for a car to travel from
  // Point A to Point B,
  // We are required to calculate the time needed to reach the destination from time to time as the
  // car speed changes.






  // If we are using imperative way, we will required to call the calculateTime() function to
  // recalculate the Time(h) again, whenever the speed changes.
  testImperative() {
    // Imperative style
    let s = 100, // speed 
      d = 100; // 100km
    const calculateTime = (s, d) => {
      return (d / s).toFixed(2);
    };
    console.log(`Time taken: ${calculateTime(s, d)} hour(s)`);
    s = 80; // speed reduce to 80km/h
    console.log(`Time taken: ${calculateTime(s, d)} hour(s)`);
    s = 60; // speed reduce to 80km/h
    console.log(`Time taken: ${calculateTime(s, d)} hour(s)`);
    s = 40; // speed reduce to 80km/h
    console.log(`Time taken: ${calculateTime(s, d)} hour(s)`);
    s = 10; // speed reduce to 80km/h
    console.log(`Time taken: ${calculateTime(s, d)} hour(s)`);
  }











  // If we are using reactive way, we can subscribe the changes to speed or distance,
  // In this case we will let the observable to perform the call calculation function,
  // if there is any new updates from these 2 values.

  testReactive() {
    const speed = of(100, 80, 60, 40, 10)
    .pipe(

      concatMap(x => of(x).pipe(delay(1000)))
    );
    const distance = of(100);

    const subscription = combineLatest(distance, speed)
      .pipe(
        map(value => (value[0] / value[1]).toFixed(2))
        )
      .subscribe(value => {
        console.log(`Time taken: ${value} hour(s)`);
      });

    // setTimeout(() => {
    //   subscription.unsubscribe();
    // }, 3000);
  }






















  /* ************************************************************************************************* */

  // Example: You want to set a reminder to call your friend.

  testPromise(hour: number) {
    const newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(hour);
      }, Number(`${hour}000`));
    });

    newPromise.then(result => {
      console.log(
        `${result} hour reminder: Hey, pls give a call to your friends now`
      );
    });
  }
















  // But with observable, you could set up a reminder to remind you every (n) hout
  testObs(hour: number) {
    const source = interval(hour);

    const subscribe = source
      .pipe(filter(time => time > 0))
      .subscribe(result => {
        console.log(
          `This is the ${result} reminder (every ${hour} hour), pls give a call to your friends now`
        );
      });
  }











  emojis = of(
    "🐟",
    "🧀",
    "🍄",
    "🍅",
    "🌾",
    "🐔",
    "🐮",
    "🍍",
    "🐵",
    "🏓",
    "🎸"
  ).pipe(concatMap(e => of(e).pipe(delay(3000))));
  //.subscribe(e => {console.log(e)});







  // <!-- Non async pipe -->
  emojisTxt = "";

  ngOnInit() {
    // this.emojis
    // .pipe(
    //   //takeUntil(this.ngUnsubscribe)
    // )
    // .subscribe(newEmoji => {
    //   this.emojisTxt = newEmoji;
    //   console.log('newEmoji', newEmoji)
    // });
  }

























  ngUnsubscribe: Subject<any> = new Subject();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }















  // Async Pipe demo for ngFor 
  animalEmoji = ["😾", "🐉", "🦢"];
  faceEmoji = ["😀", "🤩", "😲"];
  foodEmoji = ["🍟", "🍖", "🥐"];
  carEmoji = ["🚜", "🚗", "🚍"];
  symbolEmoji = ["🧡", "🆘", "🆗"];

  emojiList = of(
    this.animalEmoji,
    this.faceEmoji,
    this.foodEmoji,
    this.carEmoji,
    this.symbolEmoji
  ).pipe(concatMap(e => of(e).pipe(delay(3000))));
}
