function leerMemoria() {
  database.ref("memorias").on("value", (snapshot) => {
    memoria = snapshot.val();
    memoria_array = Object.values(memoria);
    memoria_elegida =
      memoria_array[Math.floor(Math.random() * memoria_array.length)];
    return memoria_elegida;
  });
}

function leerDia() {
  database.ref("dia").on("value", (snapshot) => {
    dia = snapshot.val();
    return dia;
  });
}
function leerMes() {
  database.ref("mes").on("value", (snapshot) => {
    mes_numero = snapshot.val();
    return mes_numero;
  });
}

function leerAño() {
  database.ref("año").on("value", (snapshot) => {
    año = snapshot.val();
    return año;
  });
}

function textoTermino() {
  estaHablando = false;
}

function textoEmpezo() {
  estaHablando = true;
}

function convertirMesEnPalabra(mes_numero) {
  if (mes_numero == 1) {
    mes_palabra = "enero";
  } else if (mes_numero == 2) {
    mes_palabra = "febrero";
  } else if (mes_numero == 3) {
    mes_palabra = "marzo";
  } else if (mes_numero == 4) {
    mes_palabra = "abril";
  } else if (mes_numero == 5) {
    mes_palabra = "mayo";
  } else if (mes_numero == 6) {
    mes_palabra = "junio";
  } else if (mes_numero == 7) {
    mes_palabra = "julio";
  } else if (mes_numero == 8) {
    mes_palabra = "agosto";
  } else if (mes_numero == 9) {
    mes_palabra = "septiembre";
  } else if (mes_numero == 10) {
    mes_palabra = "octubre";
  } else if (mes_numero == 11) {
    mes_palabra = "noviembre";
  } else if (mes_numero == 12) {
    mes_palabra = "diciembre";
  }
}

function grabarResultado() {
  database.ref("memorias").push(rec.resultString);
  grabado = true;
  agregarVida(); 
}

function estaGrabando() {
  esta_grabando = true;
}

function agregarVida() {
  if (mes_numero == 1 || mes_numero == 3 || mes_numero == 5 || mes_numero == 7 || mes_numero == 8 || mes_numero == 10) {
    if (dia < 31) {
      nuevo_dia = dia + 1;
      database.ref('dia').set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref('dia').set(nuevo_dia);
      database.ref('mes').set(nuevo_mes);
    }
  } else if (mes_numero == 4 || mes_numero == 6 || mes_numero == 9 || mes_numero == 11) {
    if (dia < 30) {
      nuevo_dia = dia + 1;
      database.ref('dia').set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref('dia').set(nuevo_dia);
      database.ref('mes').set(nuevo_mes);
    }
  } else if (mes_numero == 2) {
    if (dia < 28) {
      nuevo_dia = dia + 1;
      database.ref('dia').set(nuevo_dia);
      
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref('dia').set(nuevo_dia);
      database.ref('mes').set(nuevo_mes);
    }
  } else if (mes_numero == 12) {
    if (dia < 31) {
      nuevo_dia = dia + 1;
      database.ref('dia').set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = 1;
      nuevo_año = año + 1;
      database.ref('dia').set(nuevo_dia);
      database.ref('mes').set(nuevo_mes);
      database.ref('año').set(nuevo_año);
    }
  }
}
