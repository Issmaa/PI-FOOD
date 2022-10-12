
export function validate(value){
    let errors = {};
 
    const number = /^\d*$/
    const string = /^[a-zA-Z ]{2,50}$/
    //VALIDACION PARA NAME
    if(!value.name) {errors.name = 'Nombre requerido';}
    if(value.name.length < 2) {errors.name= 'Nombre muy corto para una receta';}
    if(!string.test(value.name)){
      errors.name = 'El nombre no puede incluir numeros y debe ser mayor a 2 letras';
    }
 
    //VALIDACION PARA summary
    if(value.summary < 10) {
        errors.summary = 'resumen demasiado corto';
    }

    //VALIDACION PARA HealthScore
    if(!number.test(value.healthScore)) {
        errors.healthScore = 'Debe ser un numero entero';
    }
    if(value.healthScore < 1) {
        errors.healthScore = 'Porfavor introduzca un numero mayor a 0';
    }
    if (value.healthScore > 100){
      errors.healthScore = 'El numero debe ser menor a 100';
    }
 
    if(!value.diets.length) errors.diets = 'Debe incluir al menos un tipo de dieta'
 
    return errors;
  }