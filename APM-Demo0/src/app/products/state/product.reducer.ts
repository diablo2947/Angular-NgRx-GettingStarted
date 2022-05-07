import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as AppState from 'src/app/app.state';
import { Product } from '../product';

export interface ProductState extends AppState.State {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const showProductCodeSelector = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export interface State extends AppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
