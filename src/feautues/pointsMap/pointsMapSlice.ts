import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {pointsMapInitialState} from './pointsMapInitialState';

const pointsMapAPI = 'https://gist.githubusercontent.com/JohnGeorgiadis/09c588e60c7d9ef1185547c9c031b694/raw/3a9ef99cbaa82b4bbe4ffb9072fe7b840a5fe424/KahootPoints.json';

export const fetchPointsMap = createAsyncThunk(
    'pointsMap/fetchPointsMap',
    async () => {
        try {
            const response = await fetch(pointsMapAPI);
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

export const pointsMapSlice = createSlice({
    name: 'pointsMaps',
    initialState: pointsMapInitialState,
    reducers: {},
    extraReducers: {
        [fetchPointsMap.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.points = [...action.payload.data]
        },
        [fetchPointsMap.rejected.type]: (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.hasError = true;
            }
        }
    },
})

export default pointsMapSlice.reducer