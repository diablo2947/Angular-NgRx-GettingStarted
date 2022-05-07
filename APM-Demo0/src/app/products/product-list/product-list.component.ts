import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '../product';
import * as Reducer from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  errorMessage$: Observable<string> = this.store.select(Reducer.getError);

  displayCode$: Observable<boolean> = this.store.select(
    Reducer.showProductCodeSelector
  );

  products$: Observable<Product[]> = this.store.select(Reducer.getProducts);

  selectedProduct$ = this.store.select(Reducer.getCurrentProduct);

  constructor(private store: Store<Reducer.State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ productId: product.id })
    );
  }
}
