import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layaout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Producto = () => {
  //state de producto
  const [producto, guardarProducto] = useState({});

  //state del error
  const [error, guardarError] = useState(false);

  //Routing para obtener el id actual
  const routing = useRouter();
  const {
    query: { id },
  } = routing;

  //context de firebase
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        //producto.exist es una funcion de firebase
        if (producto.exists) {
          console.log("el producto existe");
          guardarProducto(producto.data());
        } else {
          console.log("el producto no existe");
          guardarError(true);
        }
      };
      obtenerProducto();
    } else {
      <Error404 />;
    }
  }, [id]);
  if (Object.keys(producto).length === 0) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
  } = producto;

  return (
    <Layaout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              margin-top: 5rem;
              text-align: center;
            `}
          >
            {nombre}
          </h1>
          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}{" "}
              </p>
              <img src={urlimagen} />
              <p>{descripcion}</p>
              <h2>Agrega tu comentario</h2>
              <form>
                <Campo>
                  <input type="text" name="mensaje" />
                </Campo>
                <InputSubmit type="submit" value="Enviar Comentario" />
              </form>
              <h2
                css={css`
                  margin: 2rem, 0;
                `}
              >
                Comentarios
              </h2>
              {comentarios.map((comentario) => (
                <li
                  key={`${comentario.usuarioId}-${i}`}
                  css={css`
                    border: 1px solid #e1e1e1;
                    padding: 2rem;
                  `}
                >
                  <p>{comentario.nombre}</p>
                  <p>Escrito por:{comentario.usuarioNombre}</p>
                </li>
              ))}
            </div>
            <aside>
              <Boton target="_blank" bgColor="true" href={url}>
                Visitar URL
              </Boton>
              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votos} Votos
                </p>

                { <Boton >Votar</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
        </div>
      </>
    </Layaout>
  );
};

export default Producto;
