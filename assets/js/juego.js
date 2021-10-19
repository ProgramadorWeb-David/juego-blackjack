/**  
 2C = Two of Clubs (Tréboles)
 2D = Two of Diamonds (Diamantes)
 2H = Two of Hearts (Corazones)
 2S = Two of Spades (Espadas)
**/


// arreglo para cargar las cartas
let deck = [];
// tipos de carta
const tipos = ['C', 'D', 'H', 'S'];
// cartas de letras
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');


// funcion para cargar y mezclar cartas
const crearDeck = () => {

    // un ciclo for para cargar el arreglo
    for (let i = 2; i <= 10; i++) {

        // otra forma de cargar el arreglo
        for (let tipo of tipos) {
            // para añadir un elemento
            deck.push(i + tipo);
        }
    }


    for (let tipo of tipos) {
        for (let esp of especiales) {
            // para añadir un elemento
            deck.push(esp + tipo);
        }
    }


    // console.log(deck);

    deck = _.shuffle(deck);

    console.log(deck);

    return deck;
}

crearDeck();


// esta función me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }


    // elimina el último elemento ya que viene mezclado y lo muestra
    const carta = deck.pop();

    return carta;
}


// pedirCarta();


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    // let para guardar el número
    // let puntos = 0;

    // como saber si es un numero o no.. con la funcion isNaN devuelve
    // true en caso que "NO sea un numero"!!
    // if (isNaN(valor)) {
    //     console.log('No es un número');

    //  A vale "11" todas las demas letras valen "10"
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     console.log('Es un número');
    // guarda el numero en un let
    //     puntos = valor * 1;
    // }


    // otra forma más sencilla y con menos código 
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}


// turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        // tenemos que crear la carta cada vez que haga un click
        // <img class="carta" src="assets/cartas/2C.png">

        // para crear una nueva carta.
        const imgCarta = document.createElement('img');
        // 	` = alt + 96
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana  =(');
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana!');
        } else if (puntosComputadora > 21) {
            alert('Jugador Gana!');
        } else {
            alert('Computadora Gana!');
        }
    }, 10);

}


// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    // tenemos que crear la carta cada vez que haga un click
    // <img class="carta" src="assets/cartas/2C.png">

    // para crear una nueva carta.
    const imgCarta = document.createElement('img');
    // 	` = alt + 96
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('te pasaste de 21, perdiste');
        // terminar turno de jugador cuando supere los 21
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, GENIAL!');
        // terminar turno de jugador si llega a los 21
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }

});


// evento para boton "Detener"
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});