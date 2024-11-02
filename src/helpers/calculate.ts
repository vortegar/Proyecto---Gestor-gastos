export const amountCalculate = (itemsAmount: number, dataAmount: number): number => {
    return dataAmount - itemsAmount 
};

export const calculateAmountToPay = (firtPersonAmount: number, secondPersonAmount: number): number => {
    const result = firtPersonAmount - secondPersonAmount 
    if(result < 0 ) {
        return result * -1
    }
    return result
};

export const getPersonToPay = (firstPersonAmoutn: number, secondPersonAmount: number): string => {
    return firstPersonAmoutn < secondPersonAmount ? 'Andreina' : 'Victorio'
};