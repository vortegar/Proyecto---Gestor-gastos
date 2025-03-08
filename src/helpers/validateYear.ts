import { Month } from '../interface/MonthInterface';

export const isFullYear = (month:Month[]) => {
    return (month.length !== 12 ) ? true : false
}