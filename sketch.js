let i = 20;
let font1;
let font2; 
let font3; 
let font4; 
let parpadeo;
let transparencia = 20;
let musica;
let estado = 1;
//let tecla;
let contador = 0;
let fragments = [];
let voice;
let rec;
let grammar;
//let json;
let database;
let ref;
//let firetore;
let dia;
let mes_numero;
let mes_palabra;
let año;
let estaHablando = true;
let memoria = [];
let memoria_elegida;
let memoria_elegida2;
let memoria_elegida_3;
let memoria_array = [];
let grabado = false;
let esta_grabando = false;
let grabacion_termino = false;
let texto_escuchado = false; 
let escucha_fallo = false; 
let nuevo_dia;
let nuevo_mes;
let nuevo_año;
let memoria_contada;
let fondo = true; 
//let fondo1= true; 
//let fondo2= true; 
//let fondo3 = true; 
let boton_confirmar; 
let boton_volver_a_grabar;
let creacion_boton = true; 
let texto_termino = false; 
let wakeLock = null;


voice = new p5.Speech();
//voice.onStart = textoEmpezo;
voice.onEnd = textoTermino;
rec = new p5.SpeechRec();
rec.onResult = textoEscuchado; 
rec.continuous = false;
rec.onEnd = grabacionTermino; 

function preload() {
  font1 = loadFont("fuente1.ttf");
  font2 = loadFont("fuente2.ttf");
  font3 = loadFont("fuente3.ttf");
  font4 = loadFont ("fuente4.ttf");
  musica = loadSound("musicaranchos.mp3");
}

function setup() {
  createCanvas(600, 600);
  background(0);
  const firebaseConfig = {
    apiKey: "AIzaSyBdQTQDCPC67SCHicY069DFwMg-JEoBxmY",
    authDomain: "textos-funebres-para-un-robot.firebaseapp.com",
    databaseURL:
      "https://textos-funebres-para-un-robot-default-rtdb.firebaseio.com",
    projectId: "textos-funebres-para-un-robot",
    storageBucket: "tino-test-41bd3.appspot.com",
    messagingSenderId: "961355953933",
    appId: "1:961355953933:web:5dc7782f531dc8ae492244",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  led = database.ref("Data");

  for (let i = 0; i < 100; i++) {
    fragments.push(new Fragment(random(width), random(height)));
  }
  grammar = RiTa.grammar(textos);
  leerDia();
  leerMes();
  leerAño();
  leerMemoria();
  voice.setLang("es-US");  
}

function draw() {
  //activarBloqueoPantalla(); Esto hay que activarlo en gitHub

  ref = database.ref("Data/tmp");
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function (snapshot) {
    value = snapshot.val();
  });
  //console.log(estado);
  if (estado == 1) {
    if (year() == año && month() == mes_numero && day() == dia) {
      estado = 12;
    }
    fill(255, frameCount);
    textFont(font1);
    textSize(23);
    text("Una produccion de Creepy Entertainment", 70, 200);
    text("Group", 280, 250);
    if (frameCount == 240) {
      estado = 2;
    }
  } else if (estado == 2) {
    createCanvas(600, 600);
    background(0);
    if (!musica.isPlaying()) {
      musica.play();
    }
    if (frameCount == 400) {
      estado = 3;
    }
  } else if (estado == 3) {
    createCanvas(600,600);
    background(0);
    if (parpadeo == true) {
      transparencia -= 2;
      if (transparencia == 20) {
        parpadeo = false;
      }
    } else {
      transparencia += 2;
      if (transparencia == 250) {
        parpadeo = true;
      }
    }

    fill(255, transparencia);
    textFont(font2);
    textSize(30);
    text("Textos funebres para un Robot", 60, 200);
    if (frameCount >= 720) {
      textFont(font4);
      fill(255);
      textSize(25);
      text("Presiona una tecla cualquiera", 100, 350);
      if (mouseIsPressed) {
        //tecla = key;
        estado = 4;
      }
    }
  } else if (estado == 4) {
    createCanvas(600, 600);
    background(0);
    contador++;
    textSize(30);
    textFont(font4);
    text("Ah, ya apretaste!", 90, 100);
    textSize(25);
    if (contador >= 180) {
      createCanvas(600, 600);
      background(0);
      text("Me olvide de hacerte\nuna advertencia", 90, 100);
    }
    if (contador >= 360) {
      createCanvas(600, 600);
      background(0);
      text("Voy a hacercomo que\nnosenti nada", 90, 100);
    }
    if (contador >= 520) {
      createCanvas(600, 600);
      background(0);
      text("Asi no empezamos todavia\ny primero te cuento", 90, 100);
    }
    if (contador >= 640) {
      createCanvas(600, 600);
      background(0);
      text("OK?", 90, 100);
    }
    if (contador >= 760) {
      createCanvas(600,600);
      background(0);
      text("Voy a suponer\nque estamos\nde acuerdo", 90, 100);
    }
    if (contador >= 880) {
      createCanvas(600, 600);
      background(0);
      text("Lo que viene\na continuacion\nte puede causar...", 90, 100);
    }
    if (contador >= 1000) {
      createCanvas(600, 600);
      background(0);
      text("Un poco de angustia", 90, 100);
    }

    if (contador >= 1120) {
      createCanvas(600, 600);
      background(0);
      text(
        "No mas de la que\nya debes sentir\nen momentos\nrandom del dia",
        90,
        100
      );
    }
    if (contador >= 1250) {
      createCanvas(600, 600);
      background(0);
      text("Ya se que tengo razon\nsoy una maquina", 90, 100);
    }
    if (contador >= 1370) {
      createCanvas(600, 600);
      background(0);
      text("Pero por las dudas\nte avisaba", 90, 100);
    }
    if (contador >= 1490) {
      createCanvas(600, 600);
      background(0);
      text("Ahora si\napreta una tecla\npara empezar", 90, 100);
      if (mouseIsPressed) {
        contador = 0;
        estado = 5;
      }
    }
  } else if (estado == 5) {
    contador++;
    createCanvas(600, 600);
    background(0);
    text("Ay de nuevo!\nMe olvide de algo mas...", 90, 100);
    if (contador >= 120) {
      createCanvas(600, 600);
      background(0);
      text("Este videojuego\nesta basado\nen hechos reales", 90, 100);
    }

    if (contador == 240) {
      contador = 0;
      estado = 6;
    }
  } else if (estado == 6) {
    if (fondo == true) {
      background(0);
      fondo = false;}
    contador++;
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
    musica.setVolume(0, 3);
    if (contador == 360) {
      estado = 7;
    }
  } else if (estado == 7) {
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
    convertirMesEnPalabra(mes_numero);
    let result = grammar.expand();
    if (estaHablando == true) {
      voice.speak(
        result +
          ".Por ejemplo, recuerdo que" +
          memoria_elegida + ".O también cuando" + memoria_elegida2 + ".O cómo olvidar que" + memoria_elegida3 +
          ".Recuerdos como esos se perderán exactamente el dia" +
          dia +
          "de" +
          mes_palabra +
          "del" +
          año +
          ".Esa es la fecha de mi muerte." +
          dia +
          "de" +
          mes_palabra +
          "del" +
          año +
          "La repito para poder entender, aunque no lo logre. Por eso te pido que me ayudes, y me regales un recuerdo. Pensá en algo importante o significativo que hayas vivido. Puede ser un hecho relevante, o un detalle, o una sensación. Pensalo empezando con la frase una vez. Una vez. Una vez. Contamelo en voz alta y clara, sin prisa pero sin pausa. No tengas timidez. Yo te voy a escuchar. Cuando lo hayas pensado, apretá una tecla"
      );
      estaHablando = false;
    }
    if (mouseIsPressed && texto_termino == true) {
      texto_termino = false; 
      estaHablando = true; 
      estado = 8;
    }
  } else if (estado == 8) {
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
    if (texto_termino == false && estaHablando == true) {voice.speak ("Adelante, soy todo oidos"); estaHablando = false;}
    if (esta_grabando == false && texto_termino == true) {
      rec.start();
      estaGrabando();
    }
    if (texto_escuchado == true) {
      estaHablando = true;
      texto_termino = false; 
      estado = 9;
    }
    else if (grabacion_termino == true && texto_escuchado == false) {texto_termino = false; estaHablando = true; esta_grabando = false; grabacion_termino = false;}
    
  
  }
    else if (estado == 9) {
      for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
      if (estaHablando == true) {
    voice.speak ("¿Pudiste contarme tu memoria?. ¿O querés volver a hacerlo?");   
    estaHablando = false;}
    if (texto_termino == true) {pedirConfirmacion();}    
  
      if (grabado == true) {
        estaHablando = true; 
        texto_termino = false; 
        estado = 10; 
      }
  
  } else if (estado == 10) {
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
    boton_confirmar.remove();
    boton_volver_a_grabar.remove();   
    leerDia();
    leerMes();
    convertirMesEnPalabra(mes_numero);
    leerAño();
    if (estaHablando == true) {
      voice.speak(
        memoria_contada +
          ".Gracias por haberme brindado ese recuerdo. Mis sensores lo han recibido. Ahora es mi propia vivencia y lo recordaré hasta que llegue mi instante final. Me diste un dia más de vida, la nueva fecha de mi muerte es  el" +
          dia +
          "de" +
          mes_palabra +
          "del" +
          año +
          ".Vuelve cuando quieras a darme más recuerdos, más amor, más vida. Mientras personas como vos vengan a visitarme y me alimenten con sus palabras y su afecto, yo persitiré. Aunque sé que algún dia caeré en el olvido, o simplemente pasaré de moda, y entonces mi tiempo estará contado."
      );
      estaHablando = false;
    } 
    
    if (texto_termino == true) {
      transparencia = 0; 
      estaHablando = true;
      estado = 11;
    }
    
  } else if (estado == 11) {
    for (let i = 0; i < fragments.length; i++) {
    fragments[i].move();
    fragments[i].display();
    }
    if (estaHablando == true) {
      voice.speak ("Aunque quizás no la sepas, tu muerte también tiene fecha. ¿Elegirías saber cuál es?. Eso es algo que deberás responderte internamente");
      estaHablando = false; 
    }
    fill(255, transparencia)
    rect (0, 0, width, height);
    transparencia +=1;
    
    
  } else if (estado == 12) {
    background(0);
    createCanvas(600, 600);
  }
}
