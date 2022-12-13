import { configureStore } from '@reduxjs/toolkit';
import costings from './costing/reducer';
import rent from './rent/reducer';

export const store = configureStore( {
  reducer: {
    rent,
    costings
  },
} );
