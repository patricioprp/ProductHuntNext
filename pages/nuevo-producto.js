import React, { useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import { FirebaseContext } from "../firebase";
import FileUploader from "react-firebase-file-uploader";

//Validacion

import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  // imagen: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  const [error, guardarError] = useState(false);

  //State imagenes
  const [nombreImagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valores;

  //hook del router para redireccionar
  const router = useRouter();

  //contex con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    //Si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/login");
    }
    //Crear el objeto de nuevo Producto
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    //Insertarlo en la base de datos
    try {
      await firebase.db.collection("productos").add(producto);
      return router.push('/');
    } catch (error) {
      console.error("Hubo un error al crear el Producto ", error.message);
      guardarError(error.message);
    }
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };

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
            Nuevo Producto
          </h1>
          <Formulario onSubmit={handleSubmit}>
            <fieldset>
              <legend>Informacion General</legend>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  placeholder="Nombre"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  id="nombre"
                />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input
                  placeholder="Empresa"
                  name="empresa"
                  value={empresa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  id="empresa"
                />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <FileUploader 
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("productos")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                </Campo>

              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  placeholder="URL de tu producto"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  type="urk"
                  id="url"
                />
              </Campo>
              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu Producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  placeholder="Descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="descripcion"
                />
              </Campo>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear Producto" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoProducto;
