import React,{useState,useEffect} from 'react'

const useValidacion = (stateInicial,validar,fn) => {
    const [valores,guardarValores] = useState(stateInicial);
    const [errores,guardarErrores] = useState({});
    const [submitForm,guardarSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0;
            //si las validacion no detectaron errores
            //ejecute la funcion que se paso al useValidacion
            if(noErrores){
                fn();
            }
            guardarSubmitForm(false);
        }
    },[]);
    //todas estas funciones estaban en un componente pero ahora estan en el hook para reutilizarlas
//Funcion que se ejecuta conforme el usuario escribe algo
const handleChange = e => {
    guardarValores({
        ...valores,
        [e.target.name] : e.target.value
    });
}
//Funcion que se ejecuta conforme el usuario escribe algo
const handleSubmit = e => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    submitForm(true);
}
    return {
        valores,
        errores,
        submitForm,
        handleChange,
        handleSubmit
    };
}
 
export default useValidacion;