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
     <div className="flex flex-col justify-center items-center text-center w-3/4 mt-10 fixed left-0 top-0">
        <img src="/img/home-img.jpg" alt="inicio" className="w-[40%] max-w-full h-auto mx-auto" />
        <h4 className="text-primary mt-4">
          Una app creada para llevar tus gastos de forma ordenada.
        </h4>
      </div>

    <div className="flex flex-col justify-center items-center w-1/4 p-4 bg-[var(--purple-dark-color)] h-screen fixed right-0 top-0">
      <h2 className="z-10 text-white pb-40">A llegado la hora de gestionar tu vida financiera</h2>
      <Button
        disabled={isBlockBtn}
        type="primary"
        onClick={handleLogin}
        className="border-none w-60 bg-[var(--purple-color)] hover:!bg-white hover:!text-[var(--purple-color)] h-14" >
        Iniciar sesión con Google <GoogleOutlined />
      </Button>
      <p className="z-10 text-white mt-4">Creado por: Victorio Ortega 🏅</p>
    </div>
  </>
  );
};

