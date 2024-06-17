import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  settings: Settings = { skip: 0, limit: 12 };
  settings$ = new BehaviorSubject(this.settings);
  isDisabled = false;
  productService = inject(ProductService);
  products$: Observable<Product[]> = this.settings$
    // {0,12}, {12,12}, {24,12} ...
    .pipe(
      concatMap((setting) => this.productService.getProducts(setting)),
      // ApiResponse({0,12})
      map( apiResponse => apiResponse.products),
      // La liste des produits
      takeWhile(products => {
        if(!products.length) {
          this.isDisabled = true;
          return false;
        }
        return true;
      }),
      // On regroupe les products
      scan((oldProducts, newProducts ) => [...oldProducts, ...newProducts] )
    );
  constructor() {}

  moreProducts() {
    this.settings = {
      skip: this.settings.skip + this.settings.limit,
      limit: this.settings.limit,
    };
    this.settings$.next(this.settings);
  }
}
