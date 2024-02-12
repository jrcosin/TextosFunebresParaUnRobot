function activarBloqueoPantalla() {
  if ("wakeLock" in navigator) {
    navigator.wakeLock.request("screen").then((wl) => {
      wakeLock = wl;
      console.log("Bloqueo de pantalla activado.");
    });
  }
}

function leerMemoria() {
  database.ref("memorias").on("value", (snapshot) => {
    memoria = snapshot.val();
    memoria_array = Object.values(memoria);
    for (let i = memoria_array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [memoria_array[i], memoria_array[j]] = [
        memoria_array[j],
        memoria_array[i],
      ];
    }

    memoria_elegida = memoria_array[1];
    memoria_elegida2 = memoria_array[2];
    memoria_elegida3 = memoria_array[3];
    //return memoria_elegida;
  });
}

//let numero_azaroso = Math.floor(Math.random() * memoria_array.length - 2)

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
  texto_termino = true;
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

function pedirConfirmacion() {
  if (creacion_boton == true) {
    boton_confirmar = createButton("Pude contarla");
    boton_confirmar.position(100, 200);
    boton_confirmar.size (130, 90);
    boton_confirmar.style("font-size", "25px");
    boton_volver_a_grabar = createButton("Volver a contarla");
    boton_volver_a_grabar.position(370, 200);
    boton_volver_a_grabar.size(130, 90);
    boton_volver_a_grabar.style("font-size", "25px");
    creacion_boton = false;
  }
  boton_confirmar.mousePressed(() => {
    grabarResultado();
  });

  boton_volver_a_grabar.mousePressed(() => {
    texto_escuchado = false;
    esta_grabando = false;
    boton_confirmar.remove();
    boton_volver_a_grabar.remove();
    creacion_boton = true;
    texto_termino = false; 
    estaHablando = true;
    grabacion_termino = false; 
    estado = 8;
  });
}

function grabarResultado() {
  database.ref("memorias").push(memoria_contada);
  grabado = true;
  texto_termino = false; 
  agregarVida();
}

function estaGrabando() {
  esta_grabando = true;
}

function textoEscuchado() {
  texto_escuchado = true;
  memoria_contada = rec.resultString;
  //console.log ("Texto escuchado: " + texto_escuchado)
}

function agregarVida() {
  if (
    mes_numero == 1 ||
    mes_numero == 3 ||
    mes_numero == 5 ||
    mes_numero == 7 ||
    mes_numero == 8 ||
    mes_numero == 10
  ) {
    if (dia < 31) {
      nuevo_dia = dia + 1;
      database.ref("dia").set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref("dia").set(nuevo_dia);
      database.ref("mes").set(nuevo_mes);
    }
  } else if (
    mes_numero == 4 ||
    mes_numero == 6 ||
    mes_numero == 9 ||
    mes_numero == 11
  ) {
    if (dia < 30) {
      nuevo_dia = dia + 1;
      database.ref("dia").set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref("dia").set(nuevo_dia);
      database.ref("mes").set(nuevo_mes);
    }
  } else if (mes_numero == 2) {
    if (dia < 28) {
      nuevo_dia = dia + 1;
      database.ref("dia").set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = mes_numero + 1;
      database.ref("dia").set(nuevo_dia);
      database.ref("mes").set(nuevo_mes);
    }
  } else if (mes_numero == 12) {
    if (dia < 31) {
      nuevo_dia = dia + 1;
      database.ref("dia").set(nuevo_dia);
    } else {
      nuevo_dia = 1;
      nuevo_mes = 1;
      nuevo_año = año + 1;
      database.ref("dia").set(nuevo_dia);
      database.ref("mes").set(nuevo_mes);
      database.ref("año").set(nuevo_año);
    }
  }
}
 
function grabacionTermino(){
  grabacion_termino = true; 
}
