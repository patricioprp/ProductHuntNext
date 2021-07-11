export default function validarIniciarSesion(valores) {
    const errores = {};
    
    //Validamos el email con expresion regular
    if (!valores.email) {
      errores.email = "El Email es obligatorio";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
      errores.email="Email no valido";
    }
  
    //Validamos el password firebase pide que el password sea el menos de 6 caracteres
    if (!valores.password) {
      errores.password = "El Password es obligatorio";
    }else if(valores.password.length < 6){
        errores.password = "El Password debe ser de al menos 6 caracteres";
    }
  
    return errores;
  }
  