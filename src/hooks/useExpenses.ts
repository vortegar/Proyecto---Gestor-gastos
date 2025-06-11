import { useContext, useEffect, useState } from "react"
import { MonthContext } from "../context/MonthContextProvider";
import { useForm } from "react-hook-form";

export const useExpenses = () => {

    const { monthActual } = useContext(MonthContext);
  
    const fixedExpenses = monthActual?.fixed_expenses;
    const extraExpenses = monthActual?.extra_items;
   
  const { getValues } = useForm({
    defaultValues: {
      items: monthActual?.fixed_expenses?.map(v => ({
        spent_type: v.spent_type,
        total: v.total,
        total_final: (v.spent_type == 'Arriendo') ?  Number(v.total) * 0.4 : Number(v.total) / 2,
        user: (v.spent_type === 'Arriendo' || v.spent_type === 'Cuota Auto') ? 'Andreina' : 'Victorio'
      }))
    }
  });


    const expensesAcumuladorPerson = monthActual?.expenses?.reduce((acc: { [key: string]: number }, item) => {
      const { user_1, user_2 } = item;
      if (acc['Victorio'] === undefined) acc['Victorio'] = 0;
      if (acc['Andreina'] === undefined) acc['Andreina'] = 0;
      acc['Victorio'] += +user_1;
      acc['Andreina'] += +user_2;
    return acc;
  }, {});

  // Se suman los montos que pago caga persona en los servicios
  // mas los que una peersona le pago a la otra
//   const amountDiferenceUsers = {
//     Victorio : totalDataItems?.Victorio + expensesAcumuladorPerson?.Andreina,
//     Andreina : totalDataItems?.Andreina + expensesAcumuladorPerson?.Victorio
//   }
//   const resultDiference = amountDiferenceUsers.Victorio - amountDiferenceUsers.Andreina
 
    const [ diference, setDiference ] = useState<string>('0');
    const [ resultDiference, setResultDiference ] = useState<number>(0);
    const [ amountDiferenceUsers, setAmountDiferenceUsers ] = useState({
        Victorio: 0,
        Andreina: 0,
    });

    useEffect(() => {   
        if (!extraExpenses?.[0]?.total) {
            setResultDiference(0);
        return;
    }
    const totalDataItems = getValues('items')?.reduce((acc, curr) => {
        if (acc[curr.user]) {
        acc[curr.user] += curr.total_final;
      } else {
        acc[curr.user] = curr.total_final;
      }
      return acc; 
    }, {} as { [key: string]: number });
  // Se suman los montos que pago caga persona en los servicios
  // mas los que una peersona le pago a la otra
     setAmountDiferenceUsers(() => {
  return {
    Victorio: (totalDataItems?.Victorio || 0) + (expensesAcumuladorPerson?.Andreina || 0),
    Andreina: (totalDataItems?.Andreina || 0) + (expensesAcumuladorPerson?.Victorio || 0),
  };
});

    setResultDiference(amountDiferenceUsers.Victorio - amountDiferenceUsers.Andreina)
   }, [monthActual]);


useEffect(() => {
  if (!extraExpenses?.[0]?.total) {
    setDiference('0');
    return;
  }

  const totalExtra = extraExpenses[0].total;
  const adjustedDifference =
    resultDiference > 0
      ? totalExtra - resultDiference
      : totalExtra + Math.abs(resultDiference);

  setDiference(adjustedDifference.toLocaleString('es-ES'));
}, [monthActual]);

  return {
    amountDiferenceUsers,
    extraExpenses,
    resultDiference,
    fixedExpenses,
    diference,
    getValues
  }
}
