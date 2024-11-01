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
    <div  className="flex flex-col items-center">
    <img src="/img/home-img.jpg" alt="inicio" className="absolute inset-0 w-full h-full object-cover" />
      <Button
        disabled={isBlockBtn}
        type="primary"
        onClick={handleLogin}
        className="w-60 lg:mt-72  sm:mt-96 bg-yellow-500 hover:!bg-yellow-600 text-black hover:!text-black"
      >
        Iniciar sesión con Google <GoogleOutlined />
      </Button>
      <Title className="z-20 lg:mt-24 sm:mt-96 !text-yellow-500" level={4}>
        Una app creada para llevar tus gastos de forma ordenada.
      </Title>
      <p className="z-10 text-yellow-500">Creado por: Victorio Ortega🏅</p>
  </div>
  );
};

