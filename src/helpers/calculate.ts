export const amountCalculate = (itemsAmount: number, dataAmount: number): number => {
    return itemsAmount < dataAmount ? dataAmount - itemsAmount : itemsAmount - dataAmount
};

export const getPersonToPay = (firstPersonAmoutn: number, secondPersonAmount: number): string => {
    return firstPersonAmoutn < secondPersonAmount ? 'Andreina' : 'Victorio'
};