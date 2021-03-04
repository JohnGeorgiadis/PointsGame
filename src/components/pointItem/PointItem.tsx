import React from 'react';
import {Button} from '@material-ui/core';
import {ButtonType, PointItemProps} from './types'
import {useDispatch} from 'react-redux';
import {setSelectedElement, removeItem} from '../../feautues/items/itemsSlice';

import './pointItem.scss';

const colors = [ButtonType.DEFAULT, ButtonType.PRIMARY, ButtonType.SECONDARY];


const PointItem: React.FC<PointItemProps> = ({value, id}) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setSelectedElement({value}));
        dispatch(removeItem({id}));
    };

    return (
        <div className="pointItem">
            <Button
                className="pointItem__button"
                onClick={handleOnClick}
                variant="contained"
                aria-label="clickable-item"
                color={randomColor}>
                {value}
            </Button>
        </div>
    );
}

export default PointItem;
