for(base = 1; base <=10; base++){    // Se definen las tablas del 1 al 10
    console.log(`\nTabla del ${base}`);   // se muestra el nombre d ecada tabla

    for(let indice = 1; indice <= 10; indice++){     // se definen los valores a multiplicar por cada tabla
        console.log(`${base} * ${indice} = ${base*indice}`);  //se muestra el resultado de cada multiplicacion

    }

}