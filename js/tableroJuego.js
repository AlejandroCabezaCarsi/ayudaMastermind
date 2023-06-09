
//----------------------------------------------------------------------------------------//

// FUNCION de SStorage de colores elegidos

// Almacena en el sessionStorage los colores elegidos por el jugador y a su vez pinto estos 
//colores en la pantalla del tablero.


let bolasPorPintar = document.getElementsByClassName("coloresseleccionados");
let arrayBolasPintar = Array.from(bolasPorPintar);
let arraydeColores = JSON.parse(sessionStorage.getItem("losColoresElegidos"));

console.log(arraydeColores);

const pintarColSelec = () => {

    for (let i = 0; i < 6; i++) {
        // arrayBolasPintar[i];
        // arraydeColores[i];
        arrayBolasPintar[i].style.backgroundColor = arraydeColores[i]
    }
}

pintarColSelec();

//----------------------------------------------------------------------------------------//

// FUNCION Tablero de juego dinamico 

const tableroContenedor = document.getElementById("tableropadre");

const createRows = (nivelValor) => {
    let fila = 0; 

    for (let i = 0; i < nivelValor; i++) {

        let row = document.createElement("div");
        row.classList.add("classRow");
        row.id = ("classRow" + i)

        if (i > 0){
            row.classList.add("filaInactiva")
        }
        


        tableroContenedor.appendChild(row);

        for (let i = 0; i < 4; i++) {

            let colors = document.createElement("div");
            colors.classList.add("classColors");

            row.appendChild(colors);
        }
        
        

        for (let i = 0; i < 4; i++) {
            
            let checkBalls = document.createElement("div");
            checkBalls.classList.add("checkBalls");
            checkBalls.id = "checkBalls" + fila + i
            
            row.appendChild(checkBalls);

            
        }
        fila++
    }
};
//----------------------------------------------------------------------------------------//


const quitaClases = () => {

    let contador = 0

    let filaAnterior = document.getElementById('classRow' + contador)
    let filaSiguiente = document.getElementById('classRow' + (contador+1))

    filaAnterior.classList.add('filaInactiva');
    filaSiguiente.classList.remove('filaInactiva'); 

    contador++

}



//FUNCION secuencia aleatoria de 4 colores

let secuencia = [];

const generarSecuenciaAleatoria = (array) => {

    //generar 4 colores aleatorios
    for (let i = 0; i < 4; i++) {
        let indiceAleatorio = Math.floor(Math.random() * array.length);
        let coloresAleatorio = array[indiceAleatorio];
        secuencia.push(coloresAleatorio);
    }
    return secuencia;
}
// ha acabado la funcion
// invoco a la funcion, con un argumento que entra por el parentesis de la declaracion
// declaro variable
generarSecuenciaAleatoria(arraydeColores);

//----------------------------------------------------------------------------------------//

//FUNCION para que se muestren los colores random en fromato rgb 

// declaro variables que necesito para esta funcion
//HTML COLLECTION

let arrayBolasSecretas = document.getElementsByClassName("coloresRandomX");

// AQUI TENGO MIS ARRAYS:

let arrayBolasX = Array.from(arrayBolasSecretas);
let arrayrandom = generarSecuenciaAleatoria(arraydeColores);
// creo mi funcion
const pintarTableroSecreto = () => {
    //  un bucle en el que el numero de vuelta del contador, se corresponde con el indice de AMBOS arrays. 
    for (let i = 0; i < 4; i++) {
        // cuando el contador= 0, el indice del array de colores es = 0 y el indice de el elemento por pintar es = 0
        // asi el primer array pintara al segundo
        arrayBolasX[i].style.backgroundColor = arrayrandom[i];
    } console.log("")
}
pintarTableroSecreto();
// pruebas

const firstRowColors = document.querySelectorAll(".row:first-child ")

//----------------------------------------------------------------------------------------//

// FUNCION para de acuerdo al nivel, se generen las filas del tablero

arraydeColores.length

if (arraydeColores.length === 4) {
    createRows(10);

} else if (arraydeColores.length === 5) {
    createRows(8);

} else {
    createRows(6);
}

//----------------------------------------------------------------------------------------//

// FUNCION para lograr pintar cada circulo, haciendo click y que no coja unicamente el ultimo valor.

const classColorsElements = document.querySelectorAll('.classColors');

classColorsElements.forEach((element) => {
    // Inicializamos el contador en 0
    let contador = 0;

    element.addEventListener('click', () => {
        const colorElegido = arraydeColores[contador];
        element.style.backgroundColor = colorElegido;

        // Incrementamos el contador
        contador++;

        // Si llegamos al final de arraydeColores, volvemos al principio
        if (contador === arraydeColores.length) {
            contador = 0;
        }
    });
});

//----------------------------------------------------------------------------------------//

// FUNCION para guardar colores elegidos al jugar


let coloresElegidosFila = [];

const guardarColores = () => {

    classColorsElements.forEach((element, index) => {

        coloresElegidosFila[index] = element.style.backgroundColor
    })

    coloresElegidosFila.length = 4;

    comparar();
}

console.log(" hola soy colores elegidos", coloresElegidosFila);

//----------------------------------------------------------------------------------------//

// FUNCION DE COMPARAR COLORES CON RESPUESTA GANADORA

let arrayCirculosComparacion = [];

const comparar = () => {

    arrayCirculosComparacion = coloresElegidosFila.map((element, index) => {

        if (element === secuencia[index]) {
            return "rgb(255, 0, 0)"
        } else if (secuencia.includes(element)) {
            return "rgb(255, 255, 255)"
        } else {
            return "transparent";
        }

        

    })

    console.log(" hola soy colores circulos pequeños", arrayCirculosComparacion);

    pintarCirculosPequenos();
}

//----------------------------------------------------------------------------------------//

// FUNCION pintar circulos pequeños

let todosCirculosPequenos = document.getElementsByClassName("checkBalls");
let arrayCirculoPequeno = Array.from(todosCirculosPequenos);


let contadorFilas = 0

console.log(contadorFilas)

const pintarCirculosPequenos = () => {

    // arrayCirculoPequeno.forEach((element, i) => {

    //     // for (let i = 0; i < 4; i++) {

    //     // arrayCirculoPequeno[i].style.backgroundColor = arrayCirculosComparacion[i]
    //     element.style.backgroundColor = arrayCirculosComparacion[i]
    // })

        

        let checkBalls0 = document.getElementById("checkBalls" + contadorFilas +"0")
        let checkBalls1 = document.getElementById("checkBalls" + contadorFilas +"1")
        let checkBalls2 = document.getElementById("checkBalls" + contadorFilas +"2")
        let checkBalls3 = document.getElementById("checkBalls" + contadorFilas +"3")

        console.log(checkBalls0.id)

        checkBalls0.style.backgroundColor = arrayCirculosComparacion[0]
        checkBalls1.style.backgroundColor = arrayCirculosComparacion[1]
        checkBalls2.style.backgroundColor = arrayCirculosComparacion[2]
        checkBalls3.style.backgroundColor = arrayCirculosComparacion[3]


        
        
        
    

    

    ganar();
}
//----------------------------------------------------------------------------------------//
// FUNCION GANAR, cuando las checkBals sean todas de un mismo color (rojo) la partida acabo.


const ganar = () => {
    contadorFilas++
    arrayCirculosComparacion = ["#000000","#000000","#000000","#000000"]
    let todosPintados = true;
    for (let i = 0; i < 4; i++) {
        if (arrayCirculoPequeno[i].style.backgroundColor !== "rgb(255, 0, 0)") {
            todosPintados = false;
            arrayCirculosComparacion = []; 
            break;
        }
    }
    if (todosPintados) {
        alert("¡Has ganado!");
    }
}













