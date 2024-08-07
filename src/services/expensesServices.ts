import { auth, db } from "./firebase";
import { collection, getDocs, deleteDoc, doc, where, query, updateDoc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";

// Actualizar
export const updateFixedExpenses = async (data, month) => {
  try {
    const user = auth.currentUser;
    validateUser(user);

    const userUid = user.uid;
    const userRef = doc(db, "users", userUid);
    const monthCollectionRef = collection(userRef, "month");

    const q = query(monthCollectionRef, where('month', '==', month));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No se encontró el documento del mes');
      return;
    }

    const monthDoc = querySnapshot.docs[0];
    
    const transformData = Object.entries(data).map(([key, value]) => ({
      spent_type: key,
      total: value
    }));

    const monthRef = doc(monthCollectionRef, monthDoc.id);
    await updateDoc(monthRef, {
      fixed_expenses: transformData
    });

    console.log("Documento actualizado con éxito");
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
};


export const updateExpenses = async (data, month) => {
  try {
    const user = auth.currentUser;
    validateUser(user);

    const userUid = user.uid;
    const userRef = doc(db, "users", userUid);
    const monthCollectionRef = collection(userRef, "month");

    const q = query(monthCollectionRef, where('month', '==', month));
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

    const monthRef = doc(monthCollectionRef, monthDoc.id);
    await updateDoc(monthRef, {
      expenses: updatedExpenses
    });

    console.log("Gastos actualizados con éxito");
  } catch (e) {
    console.error("Error añadiendo a: ", e);
  }
};

//   Eliminar
  export const deleteExpense = async (dataToDelete, fnBlock, fnRefresh, month) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
  
      const userUid = user.uid;
      const userRef = doc(db, "users", userUid);
      const monthCollectionRef = collection(userRef, "month");
  
      const q = query(monthCollectionRef, where('month', '==', month));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error('No se encontró el documento del mes');
        return;
      }
  
      fnBlock();
  
      const monthDoc = querySnapshot.docs[0];
      const monthData = monthDoc.data();
  
      // Arreglar
      const updatedExpenses = monthData.expenses.filter(expense => expense.monto !== dataToDelete.monto);
  
      const monthRef = doc(monthCollectionRef, monthDoc.id);
      await updateDoc(monthRef, {
        expenses: updatedExpenses
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log("Documento actualizado con éxito");
    } catch (error) {
      console.error("Error eliminando documento: ", error);
    }
  };

  export const deleteFixedExpense = async (dataToDelete, fnBlock, fnRefresh, month) => {
    try {
      const user = auth.currentUser;
      validateUser(user);
  
      const userUid = user.uid;
      const userRef = doc(db, "users", userUid);
      const monthCollectionRef = collection(userRef, "month");
  
      const q = query(monthCollectionRef, where('month', '==', month));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error('No se encontró el documento del mes');
        return;
      }
  
      fnBlock();
  
      const monthDoc = querySnapshot.docs[0];
      const monthData = monthDoc.data();
  
      // Arreglar
      const updatedExpenses = monthData.expenses.filter(expense => expense.monto !== dataToDelete.monto);
  
      const monthRef = doc(monthCollectionRef, monthDoc.id);
      await updateDoc(monthRef, {
        fixed_expenses: updatedExpenses
      });
  
      fnRefresh();
  
      setTimeout(() => {
        fnBlock();
      }, 300);
  
      console.log("Documento actualizado con éxito");
    } catch (error) {
      console.error("Error eliminando documento: ", error);
    }
  };