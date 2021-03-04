import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {randomDataUrls} from './constants';
import {itemsInitialState} from './itemsInitialState';

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async () => {
        // Get a random url every time
        const itemsUrl = randomDataUrls[Math.floor(Math.random() * randomDataUrls.length)];

        try {
            const response = await fetch(itemsUrl);
            if (!response.ok) {
                throw new Error('error')
            } else {
                return await response.json();
            }
        } catch (e) {
            return e;
        }
    }
)

export const itemsSlice = createSlice({
    name: 'items',
    initialState: itemsInitialState,
    reducers: {
        setSelectedElement: (state, action) => {
            state.selectedElements = [...state.selectedElements, action.payload.value]
        },
        resetSelectedElement: (state) => {
            state.selectedElements = []
        },
        removeItem: (state, action) => {
            state.data = state.data.filter((item: { id: number, value: string }) => item.id !== action.payload.id)
        }
    },
    extraReducers: {
        [fetchItems.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.data = action.payload.data.map((item: string, index: number) => ({id: index, value: item}))
        },
        [fetchItems.rejected.type]: (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.hasError = true;
            }
        }
    },
})

export const {setSelectedElement, removeItem, resetSelectedElement} = itemsSlice.actions

export default itemsSlice.reducer