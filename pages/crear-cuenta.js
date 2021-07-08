import React from "react";
import Layout from "../components/layout/Layout";
import {css} from "@emotion/react";
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

//Validacion

import useValidacion from "../hooks/useValidacion";

const CrearCuenta = () => {
  return (
    <div>
      <Layout>
        <>
          <h1
          css={css`
          text-align: center;
          margin-top: 5rem;
          `}
          >Crear Cuenta</h1>
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                placeholder="Nombre"
                name="nombre"
                type="text"
                id="nombre"
              />
            </Campo>
            <Campo>
              <label htmlFor="mail">Email</label>
              <input placeholder="Tu Email" name="mail" type="mail" id="mail" />
            </Campo>
            <Campo>
              <label htmlFor="password">Contraseña</label>
              <input
                placeholder="Tu Contraseña"
                name="password"
                type="password"
                id="password"
              />
            </Campo>
            <InputSubmit
            type="submit"
            value="Crear Cuenta"
            />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
