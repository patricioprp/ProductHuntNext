export default function crearProducto(valores) {
  const errores = {};

  //Validamos el nombre
  if (!valores.nombre) {
    errores.nombre = "El Nombre es obligatorio";
  }

  //Validamos el empresa
  if (!valores.empresa) {
    errores.empresa = "La Empresa es obligatoria";
  }

  //Validamos la URL
  if (!valores.url) {
    errores.url = "La URL es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL mal formateada o no se valida";
  }
  //La imagen se valida con una dependencia

  //Validamos la descripcion
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion al producto";
  }
  return errores;
}
