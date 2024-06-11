import { HttpClient } from "@angular/common/http";
import { Component, Input, inject } from "@angular/core";
import { Observable, combineLatest, map, startWith, timer } from "rxjs";
import { API } from "src/config/api.config";

export interface ImageApiResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() timer = 1500;
  http = inject(HttpClient);
  images$ = this.http.get<ImageApiResponse[]>(API.images);
  paths$: Observable<string> = combineLatest([
    timer(0, this.timer),
    this.images$,
  ]).pipe(map(([index, images]) => images[index % images.length].url));
  @Input() imagePaths = [
    'as.jpg',
    'cv.png',
    'rotating_card_profile.png',
    'rotating_card_profile2.png',
    'rotating_card_profile3.png',
  ];
  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  // V1
  // paths$: Observable<string> = timer(0, this.timer).pipe(
  //   // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
  //   map((index) => this.imagePaths[index % this.imagePaths.length]),
  //   // p1 p2 ....
  //   startWith(this.imagePaths[this.imagePaths.length - 1])
  // );
}
