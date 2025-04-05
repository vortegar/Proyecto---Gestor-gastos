import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Button } from 'antd';
import { GoogleOutlined } from "@ant-design/icons";

import { auth, db } from "../../services/firebase.js";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

import { useBtnRefresh } from "../../hooks/useBtnRefresh.js";

export const LoginPage = () => {
  const { login, getUsername } = useAuth();
  const {isBlockBtn, toggleBlockBtn} = useBtnRefresh()

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const handleLogin = async () => {
    toggleBlockBtn();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }
  
      const displayName = user.displayName || "Nombre desconocido";
      getUsername( displayName )
      login()
      toggleBlockBtn();
      navigate('/load');
    } catch (error) {
      toggleBlockBtn()
      console.error("Error during login", error);
    }
  };

  return (
    <>
      <div className="w-2/3 mt-52 mx-auto">
        <h2 className= "text-white font-bold text-4xl">
          GoFinance
        </h2>
        <p className= "text-white">
          Una app creada para llevar tus gastos de forma ordenada.
        </p>
        <img src="/img/minimalist.png" alt="ahorro" className="absolute left-0 bottom-0 max-w-2xl" />
      </div>
      <div className="flex flex-col justify-center items-center w-1/3 p-4 bg-white h-screen fixed right-0 top-0">
        <div className="z-10 pb-20">
          <h2 className=" text-2xl font-bold mb-2">Hola de nuevo!</h2>
          <h2 className="">Bienvenido de vuelta</h2>
          <h2 className="">A llegado la hora de gestionar tu vida financiera</h2>
        </div>
        <Button
          disabled={isBlockBtn}
          type="primary"
          onClick={handleLogin}
          className="border-none w-80 h-14 rounded-full" >
          Iniciar sesión con Google <GoogleOutlined />
        </Button>
      </div>
    </>
  );
};

