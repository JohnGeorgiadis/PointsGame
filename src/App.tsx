import React, {useEffect} from 'react';
import {PointItemsContainer, PlayerItemsContainer} from './components'
import {fetchItems} from './feautues/items/itemsSlice'

import {useDispatch} from "react-redux";
import {fetchPointsMap} from "./feautues/pointsMap/pointsMapSlice";
import './app.scss';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPointsMap());
        dispatch(fetchItems());
    }, [dispatch]);


    return (
        <div className="app">
            <PointItemsContainer/>
            <PlayerItemsContainer/>
        </div>
    );
}

export default App;
