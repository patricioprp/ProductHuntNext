import React,{useState} from "react";
import Router from 'next/router';
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import firebase from "../firebase";

//Validacion

import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";


const Login = () => {

  const [error, guardarError] = useState(false);

  const STATE_INICIAL = {
    email: "",
    password: "",
  };

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

async function iniciarSesion(){
  try {
    const usuario = await firebase.login(email,password);
    Router.push('/');
  } catch (error) {
    console.error('Hubo un error al autenticar el usuario ', error.message);
    guardarError(error.message);
  }
}

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Session
          </h1>
          <Formulario onSubmit={handleSubmit}>
            <Campo>
              <label htmlFor="mail">Email</label>
              <input
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="mail"
                id="mail"
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input
                placeholder="Tu Contraseña"
                name="password"
                password={password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                id="password"
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="iniciar Session" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
