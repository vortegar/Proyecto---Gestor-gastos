import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Button, Typography } from 'antd';
import { GoogleOutlined } from "@ant-design/icons";

import { auth, db } from "../../services/firebase.js";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export const LoginPage = () => {
  const { login, getUsername } = useAuth();

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Verificar si el usuario es nuevo
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        // Guardar datos del usuario en Firestore
        await setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }
  
      const displayName = user.displayName || "Nombre desconocido";
      getUsername( displayName )
      login()
      navigate('/load');
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const { Title } = Typography;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Title level={1}>Bienvenido a: Tus Gastos App</Title>
      <Button
        type="primary"
        onClick={handleLogin}
        className="custom-button"
      >
        Iniciar sesión con Google <GoogleOutlined />
      </Button>
      <Title level={4} style={{ marginTop: '50px'}}>Una app creada para llevar tus gastos de forma ordenada!</Title>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Creado por: Victorio Ortega🏅</p>
  </div>
  );
};

