import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { Button, Typography } from 'antd';
import { GoogleOutlined } from "@ant-design/icons";

import { firebaseConfig } from "../../services/firebase.js";

export const LoginPage = () => {
  const { login, getUsername, username } = useAuth();

  // console.log(username)
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  
  const handleLogin = () => {
  
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      // console.log('user', user)
      getUsername( user.displayName )
      login()
      navigate('/load')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
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

