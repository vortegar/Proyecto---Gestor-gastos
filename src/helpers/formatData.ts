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

export const formatToUpperCase = (data) => {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export const formatArrayMonth = (data, prop) => {
  return data.sort((a, b) => monthOrder.indexOf(a[prop]) - monthOrder.indexOf(b[prop]));
}
