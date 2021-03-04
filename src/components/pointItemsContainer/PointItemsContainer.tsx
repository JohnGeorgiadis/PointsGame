import React from 'react';
import {useSelector} from 'react-redux';
import {CircularProgress} from "@material-ui/core";
import {PointItem} from '../index';
import {RootState} from '../../store';
import {ItemDataType} from '../../feautues/items/itemsTypes';
import {PointsData} from '../../feautues/pointsMap/pointsMapTypes';
import {PointItems} from './pointItemsTypes';
import './pointItemsContainer.scss';

const PointItemsContainer = () => {
    const items = useSelector((state: RootState) => state.items.data);
    const itemsLoading = useSelector((state: RootState) => state.items.isLoading);
    const itemsError = useSelector((state: RootState) => state.items.hasError);

    const pointsMap = useSelector((state: RootState) => state.pointsMap.points);
    const pointsMapLoading = useSelector((state: RootState) => state.pointsMap.isLoading);
    const pointsMapError = useSelector((state: RootState) => state.pointsMap.hasError);

    let itemsWithPoints: Array<PointItems> = [];

    if (items.length > 0) {
        itemsWithPoints = items.map((item: ItemDataType) => {
            const points = pointsMap.filter((pointElement: PointsData) => pointElement.name === item.value);
            return ({id: item.id, value: item.value, points: points.length ? points[0].value : '0'})
        });
    }

    return (
        <div className="pointItemsContainer">
            <div className="pointItemsContainer__header"> Kahoot! Points</div>
            <div className="pointItemsContainer__title"> ITEMS:</div>
            <div className="pointItemsContainer__items">
                {(itemsLoading || pointsMapLoading) && (
                    <CircularProgress color="secondary"/>
                )}
                {itemsWithPoints && (
                    itemsWithPoints.map((item: PointItems) =>
                        <PointItem key={item.id} value={item.value} id={item.id}/>
                    )
                )}

                {(itemsError || pointsMapError) && (<p>Ooops there was an error please refresh the page.</p>)}
            </div>
        </div>
    );
}

export default PointItemsContainer;
