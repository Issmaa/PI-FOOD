export function validate(value){
    let errors = {};
 
    const number = /^\d*$/
    const string = /^[a-zA-Z ]{2,30}$/
    //VALIDACION PARA NAME
    if(!value.name){
      errors.name = 'Nombre requerido'
    } else if(!string.test(value.name)){
      errors.name = 'El nombre no puede incluir numeros y debe ser mayor a 2 letras';
    }
 
    //VALIDACION PARA HP
     if(!number.test(value.hp)){
      errors.hp = 'Debe ser un numero entero'
    } else if(value.hp < 1){
      errors.hp = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.hp > 99){
      errors.hp = 'El numero debe ser menor a 99'
    }
 
    //VALIDACION PARA ATTACK  
     if(!number.test(value.attack)){
      errors.attack = 'Debe ser un numero entero'
    } else if(value.attack < 1){
      errors.attack = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.attack > 99){
      errors.attack = 'El numero debe ser menor a 99'
    }
 
    //VALIDACION PARA DEFENSE
     if(!number.test(value.defense)){
      errors.defense = 'Debe ser un numero entero'
    } else if(value.defense < 1){
      errors.defense = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.defense > 99){
      errors.defense  = 'El numero debe ser menor a 99'
    }
 
    //VALIDACION PARA SPEED
    if(!number.test(value.speed)){
      errors.speed = 'Debe ser un numero entero'
    } else if(value.speed < 1){
      errors.speed = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.speed > 150){
      errors.speed  = 'El numero debe ser menor a 150'
    }
 
    //VALIDACION PARA HEIGHT
     if(!number.test(value.height)){
      errors.height = 'Debe ser un numero entero'
    } else if(value.height < 1){
      errors.height = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.height > 50){
      errors.height  = 'El numero debe ser menor a 50'
    }
 
    //VALIDACION PARA WEIGHT
     if(!number.test(value.weight)){
      errors.weight = 'Debe ser un numero entero'
    } else if(value.weight < 1){
      errors.weight = 'Porfavor introduzca un numero mayor a 0'
    } else if (value.weight > 1200){
      errors.weight  = 'El numero debe ser menor a 1200'
    }
 
    if(!value.type.length) errors.types = 'Debe incluir al menos un tipo'
 
    return errors;
  }