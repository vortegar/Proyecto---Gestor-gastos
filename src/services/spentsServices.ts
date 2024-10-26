import { Dispatch, SetStateAction } from "react";

import { message } from "antd";

import { auth, db } from "./firebase";
import { addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

import { validateUser } from "../helpers/validarUser";
import { formatToUpperCase } from "../helpers/formatData";
import { getSpentCollection } from "../helpers/collection";

import { Spent } from "../context/SpentContextProvider";

import { FnState, SpentsInputs } from "../components/intercafeComponents";

import { MESSAGE_ADD_ITEM, MESSAGE_DELETE_ITEM, MESSAGE_ERROR } from "../constants/constantesServices";

// Crear
export const addSpent = async (data: SpentsInputs) => {
  try {
    const formData = formatToUpperCase(data.spent_name);
    const spentCollectionRef = getSpentCollection();

    await addDoc(spentCollectionRef, {
      spent_name: formData,
      });
    message.success(MESSAGE_ADD_ITEM);
      // console.log("Documento Agregado: ");
    } catch (e) {
      console.error(MESSAGE_ERROR, e);
    }
  };

// Leer 
export const getDataSpent = async (fn: Dispatch<SetStateAction<Spent[]>>) => {
  try {
    const spentCollectionRef = getSpentCollection();

    const querySnapshot = await getDocs(spentCollectionRef);
      const spentArray = querySnapshot.docs.map(doc => {
        return{
          id: doc.id,
          spent_name: doc.data().spent_name
          }
        }
      );
      spentArray.sort((a, b) => a.spent_name.localeCompare(b.spent_name));
      fn(spentArray)
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

//   Eliminar
export const deleteSpent = async (personId: string, fnBlock: FnState, fnRefresh: FnState) => {
  try {
    const user = auth.currentUser;
    validateUser(user);
    fnBlock();

    const userUid = user!.uid;
    const docRef = doc(db, "users", userUid, "spent", personId);

    await deleteDoc(docRef);

    fnRefresh();
    setTimeout(() => {
      fnBlock();
    }, 300);

    message.success(MESSAGE_DELETE_ITEM);
  } catch (error) {
    console.error(MESSAGE_ERROR, error);
  }
};
