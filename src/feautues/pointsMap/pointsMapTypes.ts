export interface PointsData {
    name: string;
    value: string;
    noOfBonus: string;
    bonus: string;
}

export interface PointsMapTypes {
    points: Array<PointsData>;
    isLoading: boolean;
    hasError: boolean;
}