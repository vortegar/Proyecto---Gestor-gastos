import { collection, getDocs, deleteDoc, doc, where, query, updateDoc } from "firebase/firestore";
import { db } from './cloudDatabase';

// Crear
export const updateExpenses = async (data, month) => {
    try {
      const q = query(collection(db, 'month'), where('name', '==', month));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('No se encontró el documento del mes');
        return;
      }

      const monthDoc = querySnapshot.docs[0];
      const monthData = monthDoc.data();
  
      const updatedExpenses = [
        ...monthData.expenses,
        {
          descripcion: data.descripcion,
          monto: `${data.monto}`,
          user: data.user,
          fecha: data.fecha,
          spent_type: data.spent_type,
        }
      ];

      const monthRef = doc(db, 'month', monthDoc.id);
      await updateDoc(monthRef, {
        expenses: updatedExpenses
      });
    } catch (e) {
      console.error("Error añadiendo a: ", e);
    }
  };

//   Eliminar
  export const deleteExpense = async (dataToDelete, fnBlock, fnRefresh, month) => {
    try {
      const q = query(collection(db, 'month'), where('name', '==', month));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('No se encontró el documento del mes');
        return;
      }
      fnBlock();
      const monthDoc = querySnapshot.docs[0];
      const monthData = monthDoc.data();
  // TODO: Arreglar
      const updatedExpenses = monthData.expenses.filter(expense => expense.monto !== dataToDelete.monto);

      const monthRef = doc(db, 'month', monthDoc.id);
      await updateDoc(monthRef, {
        expenses: updatedExpenses
      });
      fnRefresh();
      setTimeout(() => {
        fnBlock()
      }, 300);
      // console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };