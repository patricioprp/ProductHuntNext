import App from "next/app";
//es similr aL app.jsa de create-react-app
import firebase, { FirebaseContext } from "../firebase";

const Myapp = props => {

  const {Component, pageProps} = props;

  return (<FirebaseContext.Provider
  value={{ firebase }}
  >
    <Component {...pageProps} />
  </FirebaseContext.Provider>);
};

export default Myapp;

