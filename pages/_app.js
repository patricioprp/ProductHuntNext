import App from "next/app";
//es similr aL app.jsa de create-react-app
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";

const Myapp = props => {

  const usuario = useAutenticacion();

  const {Component, pageProps} = props;

  return (<FirebaseContext.Provider
  value={{ 
    usuario,
    firebase
   }}
  >
    <Component {...pageProps} />
  </FirebaseContext.Provider>);
};

export default Myapp;

