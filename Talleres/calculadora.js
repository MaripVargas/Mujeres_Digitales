const rl = require("readline").createInterface({   
    input: process.stdin,
    output: process.stdout,
});  

const preguntar = (pregunta) => {        
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

const menu = async () => {
    console.log("\n===== CALCULADORA =====");
    console.log("1. Suma");
    console.log("2. Resta");
    console.log("3. Multiplicación");
    console.log("4. División");
    console.log("5. Porcentaje");
    console.log("6. Potencia");
    console.log("7. Salir");

    const opcion = await preguntar("Seleccione una opción: ");
    return opcion;
};


// variable menu y preguntar 

/**
 * definimos la variable preguntar con el promise para manejar operaciones asincronas, es decir,
 *  para procesos lentos como leer por consola y ya en el menu, lo que hacemos es llamar la variable preguntar
 *  para esperar el texto o respuesta que de el cliente o usuario
 */




const main = async () => {  // con el main almacenamos todo el contenido de la calculadora
    let salir = false;

    while (!salir) {      // mientras salir sea falso, el ciclo se repite
        const opcion = await menu();

        switch (opcion) {
            case "1":
                console.log("==== SUMA ====");
                const suma1 = Number(await preguntar("Ingrese el primer número: "));
                const suma2 = Number(await preguntar("Ingrese el segundo número: "));
                console.log(`El resultado de la suma es: ${suma1 + suma2}`);   // realiza la operacion y muestra el resultado
                break;

            case "2":
                console.log("==== RESTA ====");
                const resta1 = Number(await preguntar("Ingrese el primer número: "));
                const resta2 = Number(await preguntar("Ingrese el segundo número: "));
                console.log(`El resultado de la resta es: ${resta1 - resta2}`);
                break;

            case "3":
                console.log("==== MULTIPLICACIÓN ====");
                const mult1 = Number(await preguntar("Ingrese el primer número: "));
                const mult2 = Number(await preguntar("Ingrese el segundo número: "));
                console.log(`El resultado de la multiplicación es: ${mult1 * mult2}`);
                break;

            case "4":
                console.log("==== DIVISIÓN ====");
                const div1 = Number(await preguntar("Ingrese el dividendo: "));
                const div2 = Number(await preguntar("Ingrese el divisor: "));
                if (div2 === 0) {
                    console.log("Error: no se puede dividir entre 0");
                } else {
                    console.log(`El resultado de la división es: ${div1 / div2}`);
                }
                break;

            case "5":
                console.log("==== PORCENTAJE ====");
                const numero = Number(await preguntar("Ingrese el número: "));
                const porcentaje = Number(await preguntar("Ingrese el porcentaje (%): "));
                console.log(`${porcentaje}% de ${numero} es: ${(numero * porcentaje) / 100}`);
                break;

            case "6":
                console.log("==== POTENCIA ====");
                const baseNum = Number(await preguntar("Ingrese la base: "));
                const exponente = Number(await preguntar("Ingrese el exponente: "));
                console.log(`Usando operador **: ${baseNum ** exponente}`);
                break;

            case "7":
                console.log("Saliendo de la calculadora...");   // si el usuario ingresa 7, la variable salir cambia a true y se cierra el readline o el programa
                salir = true;
                rl.close();
                break;

            default:
                console.log("Opción inválida. Intente de nuevo.");
        }
    }
};

main();
