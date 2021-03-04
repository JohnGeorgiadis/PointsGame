import {configureStore} from '@reduxjs/toolkit'
import itemsReducer from './feautues/items/itemsSlice';
import pointsMapReducer from './feautues/pointsMap/pointsMapSlice';

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        pointsMap: pointsMapReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch