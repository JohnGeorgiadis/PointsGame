import React from 'react';
import {ScoreCardProps} from './types';
import './scoreCard.scss';

const ScoreCard: React.FC<ScoreCardProps> = ({value, qty, score}) => {

    return (
        <div className="scoreCard">
            <div className="scoreCard__value">
                {value}
            </div>
            <div className="scoreCard__qty">{qty}</div>
            <div>{score}</div>
        </div>
    );
}

export default ScoreCard;
