import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/DetallesProducto";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductod = () => {
      firebase.db
        .collection("productos")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerProductod();
  }, []);
  //este es quien realmente ingresa e itera los datos
  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarProductos(productos);
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map((producto) => (<DetallesProducto key={producto.id} producto={producto}/>))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
