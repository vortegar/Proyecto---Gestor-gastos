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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={1}>Bienvenido a: TusgastosApp</Title>
      <Button
        disabled={isBlockBtn}
        type="primary"
        onClick={handleLogin}
        className="custom-button"
      >
        Iniciar sesión con Google <GoogleOutlined />
      </Button>
      <Title level={4} style={{ marginTop: '50px'}}>Una app creada para llevar tus gastos de forma ordenada!!!</Title>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Creado por: Victorio Ortega🏅</p>
  </div>
  );
};

