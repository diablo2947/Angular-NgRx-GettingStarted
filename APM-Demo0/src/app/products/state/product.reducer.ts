import {
  createReducer,
  on,
  createAction,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as AppState from 'src/app/app.state';
import * as ProductActions from './product.actions';
import { Product } from '../product';

export interface ProductState extends AppState.State {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const showProductCodeSelector = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === null) return null;
    if (currentProductId != 0)
      return state.products.find((x) => x.id === currentProductId);
    return {
      id: 0,
      productName: '',
      productCode: '',
      description: '',
      starRating: 5,
    };
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export interface State extends AppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.productId,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action) => {
    return { ...state, error: action.error };
  }),
  on(ProductActions.updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((x) =>
      action.product.id === x.id ? action.product : x
    );
    return {
      ...state,
      products: updatedProducts,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
