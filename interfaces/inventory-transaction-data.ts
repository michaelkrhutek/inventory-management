export interface IQuantityIncrementTransactionData {
    totalPrice: number;
    quantity: number;
}

export interface IQuantityDecrementTransactionData {
    quantity: number;
}

export interface IRevaluationTransactionData {
    pricePerUnit: number;
}