import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Button, Typography } from 'antd';
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

  const { Title } = Typography;
  return (
    <div  className="flex flex-col items-center opacity-0 animate-fadeIn">
      <img src="/img/home-img.jpg" alt="inicio" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fadeIn" />
      <Button
        disabled={isBlockBtn}
        type="primary"
        onClick={handleLogin}
        className="border-none w-60 lg:mt-32  sm:mt-96 bg-primary hover:!bg-secondary text-black hover:!text-white"
      >
        Iniciar sesión con Google <GoogleOutlined />
      </Button>
      <Title className="z-10 lg:mt-80 sm:mt-96 !text-primary" level={4}>
        Una app creada para llevar tus gastos de forma ordenada.
      </Title>
      <p className="z-10 text-primary">Creado por: Victorio Ortega🏅</p>
  </div>
  );
};

