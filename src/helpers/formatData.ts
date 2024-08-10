const monthOrder = [
  "Enero", 
  "Febrero", 
  "Marzo", 
  "Abril", 
  "Mayo", 
  "Junio",
  "Julio", 
  "Agosto", 
  "Septiembre", 
  "Octubre", 
  "Noviembre", 
  "Diciembre"
];

interface FormatArrayMonthItem {
  [key: string]: string; // Allows for any string keys with string values
}

export const formatToUpperCase = (data: string): string => {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export const formatArrayMonth = <T extends FormatArrayMonthItem>(data: T[], prop: string): T[] => {
  return data.sort((a, b) => monthOrder.indexOf(a[prop]) - monthOrder.indexOf(b[prop]));
}