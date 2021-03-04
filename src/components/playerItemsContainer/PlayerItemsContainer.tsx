import React, {useEffect, useState} from 'react';
import {ScoreCard} from '../index';
import {Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItems, resetSelectedElement} from '../../feautues/items/itemsSlice';
import {PointsData} from '../../feautues/pointsMap/pointsMapTypes';
import {RootState} from '../../store';
import {CardDataType} from './playerItemsContainerTypes';
import './playerItemsContainer.scss';

function PlayerItemsContainer() {
    const dispatch = useDispatch()
    const selectedItems = useSelector((state: RootState) => state.items.selectedElements);
    const pointsMap = useSelector((state: RootState) => state.pointsMap.points);
    const [cardData, setCardData] = useState<Array<CardDataType>>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalBonus, setTotalBonus] = useState(0);

    const getScoreAndBonus = (occurrences: number, key: string): {score: number, bonusScore: number} => {
        let score;
        let bonusScore = 0;
        const pointsData = pointsMap.filter((points: PointsData) => points.name === key)[0];
        const noOfBonus = parseInt(pointsData.noOfBonus);
        const bonus = parseInt(pointsData.bonus);
        const itemScore = parseInt(pointsData.value)

        if (noOfBonus && occurrences >= noOfBonus) {
            const mod = occurrences % noOfBonus;
            const div = Math.floor(occurrences / noOfBonus);
            bonusScore = div * bonus - occurrences * itemScore;
            score = div * bonus + mod * itemScore;
        } else {
            score = itemScore * occurrences
        }

        return {score, bonusScore}
    }

    useEffect(() => {
        const noOfSelectedElements = selectedItems.reduce((accumulator: Map<string, number>, currentValue: string) => accumulator.set(currentValue, (accumulator.get(currentValue) || 0) + 1), new Map());
        const results: Array<CardDataType> = [];
        let bonusScoreSum = 0;
        let totalWithBonus = 0

        noOfSelectedElements.forEach((occurrences: number, key: string) => {
            const {score, bonusScore} = getScoreAndBonus(occurrences, key);
            bonusScoreSum += bonusScore
            results.push({item: key, qty: occurrences, score});
        });

        results.forEach((data: CardDataType) => totalWithBonus += data.score);

        setTotalBonus(bonusScoreSum);
        setCardData(results)
        setTotalAmount(totalWithBonus);
    }, [selectedItems, pointsMap]);

    const handleOnClick = () => {
        dispatch(fetchItems());
        dispatch(resetSelectedElement());
        setTotalAmount(0)
        setCardData([]);
    };

    return (
        <div className="playerItemsContainer">
            <div className="playerItemsContainer__header">PLAYER ITEMS</div>
            <div className="playerItemsContainer__countHeader">
                <div>ITEM</div>
                <div>QTY</div>
                <div>SCORE</div>
            </div>
            <div className="playerItemsContainer__scoreCards">
                {cardData.length > 0 && (cardData.map((data: CardDataType) =>
                    <ScoreCard key={data.item} value={data.item} qty={data.qty} score={data.score}/>
                ))}

            </div>
            <div className="playerItemsContainer__bonuses">
                <div className="playerItemsContainer__bonusesContent">
                    BONUSES <span className="playerItemsContainer__bonus">{totalBonus}</span>
                </div>
            </div>
            <div className="playerItemsContainer__footer">
                <div className="playerItemsContainer__total">
                    <div className="playerItemsContainer__totalTitle">
                        Total
                    </div>
                    <div className="playerItemsContainer__totalValue">
                        {totalAmount}
                    </div>
                </div>
                <div className="playerItemsContainer__reset">
                    <Button variant="contained" color="secondary" onClick={handleOnClick} aria-label="new-game">New
                        Game</Button>
                </div>
            </div>
        </div>
    );
}

export default PlayerItemsContainer;
