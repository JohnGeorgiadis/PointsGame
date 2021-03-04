export interface ItemDataType {
    id: number;
    value: string;
}

export interface ItemsTypes {
    data: Array<ItemDataType>;
    selectedElements: Array<string>;
    isLoading: boolean;
    hasError: boolean;
}