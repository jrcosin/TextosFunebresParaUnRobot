let i = 20;
let font1;
let parpadeo;
let transparencia = 20;
let musica;
let estado = 1;
let tecla;
let contador = 0;
let fragments = [];
let voice;
let rec;
let grammar;
let json;
// let facemesh;
//let video;
//let predictions = [];
let database;
let ref;
let firetore;
let dia;
let mes_numero;
let mes_palabra;
let año;
let estaHablando = true;
let memoria = [];
let memoria_elegida;
let memoria_array = [];
let grabado = false;
let esta_grabando = false;
let nuevo_dia;
let nuevo_mes;
let nuevo_año;

voice = new p5.Speech();
//voice.onStart = textoEmpezo;
//voice.onEnd = textoTermino;
rec = new p5.SpeechRec();
rec.onResult = grabarResultado;
rec.continuous = false;

function preload() {
  font1 = loadFont("fuente1.ttf");
  font2 = loadFont("fuente2.ttf");
  font3 = loadFont("fuente3.ttf");
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
}

function draw() {
  console.log (estaHablando);
  ref = database.ref("Data/tmp");
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function (snapshot) {
    value = snapshot.val();
  });
  console.log(estado);
  console.log(esta_grabando);
  if (estado == 1) {
    if (year() == año && month() == mes_numero && day() == dia) {
      estado = 11;
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
    if (!musica.isPlaying()) {
      musica.play();
    }
    if (frameCount == 400) {
      estado = 3;
    }
  } else if (estado == 3) {
    createCanvas(600, 600);
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
    text("Textos funebres para un Robot", 70, 200);
    if (frameCount >= 720) {
      textFont(font3);
      fill(255);
      textSize(30);
      text("Presiona una tecla cualquiera", 80, 350);
      if (mouseIsPressed) {
        //tecla = key;
        estado = 4;
      }
    }
  } else if (estado == 4) {
    createCanvas(600, 600);
    contador++;
    textSize(30);
    textFont(font3);
    text("Ah, ya apretaste!", 90, 100);
    textSize(30);
    if (contador >= 180) {
      createCanvas(600, 600);
      text("Me olvidé de hacerte\nuna advertencia", 90, 100);
    }
    if (contador >= 360) {
      createCanvas(600, 600);
      text("Voy a hacer\ncomo que no\nsentí nada", 90, 100);
    }
    if (contador >= 520) {
      createCanvas(600, 600);
      text("Así no empezamos todavia\ny primero\nte cuento", 90, 100);
    }
    if (contador >= 640) {
      createCanvas(600, 600);
      text("OK?", 90, 100);
    }
    if (contador >= 760) {
      createCanvas(600, 600);
      text("Voy a suponer\nque estamos\nde acuerdo", 90, 100);
    }
    if (contador >= 880) {
      createCanvas(600, 600);
      text("Lo que viene\na continuación\nte puede causar...", 90, 100);
    }
    if (contador >= 1000) {
      createCanvas(600, 600);
      text("Un poco de angustia", 90, 100);
    }

    if (contador >= 1120) {
      createCanvas(600, 600);
      text(
        "No más de la que\nya debés sentir\nen momentos\nrandom del dia",
        90,
        100
      );
    }
    if (contador >= 1250) {
      createCanvas(600, 600);
      text("Ya sé que tengo razón\nsoy una máquina", 90, 100);
    }
    if (contador >= 1370) {
      createCanvas(600, 600);
      text("Pero por las dudas\nte avisaba", 90, 100);
    }
    if (contador >= 1490) {
      createCanvas(600, 600);
      text("Ahora sí\napretá una tecla\npara empezar", 90, 100);
      if (mouseIsPressed) {
        contador = 0;
        estado = 5;
      }
    }
  } else if (estado == 5) {
    contador++;
    createCanvas(600, 600);
    text("Ay de nuevo!\nMe olvidé de algo mas...", 90, 100);
    if (contador >= 120) {
      createCanvas(600, 600);
      text("Este videojuego\nestá basado\nen hechos reales", 90, 100);
    }

    if (contador == 240) {
      contador = 0;
      estado = 6;
    }
  } else if (estado == 6) {
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
   if (estaHablando == true) {voice.speak(
      result +
        ".Por ejemplo, recuerdo que" +
        memoria_elegida +
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
        "La repito para poder entender, aunque no lo logre. Por eso te pido que me ayudes, y me regales un recuerdo. Pensá en algo importante o significativo que hayas vivido. Puede ser un hecho relevante, o un detalle, o una sensación. Pensalo empezando con la frase una vez. Una vez. Una vez. Cuando quieras, apretá una tecla y contamelo en voz alta. Yo te voy a escuchar");
    estaHablando = false;}
    if (mouseIsPressed) {
      estado = 8;
      
    }
  } else if (estado == 8) {
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();
    }
    voice.cancel();
    if (esta_grabando == false) {
      rec.start();
      estaGrabando();
    }
    console.log(grabado);
    if (grabado == true) {
      estaHablando = true; 
      estado = 9;
    }
  } else if (estado == 9) {
    for (let i = 0; i < fragments.length; i++) {
      fragments[i].move();
      fragments[i].display();}
      leerDia();
      leerMes();
      convertirMesEnPalabra(mes_numero);
      leerAño();
      if (estaHablando == true) {
      voice.speak ("Gracias por haberme brindado ese recuerdo. Mis sensores lo han recibido. Lo recordaré hasta el final de mis días. Ahora la nueva fecha de mi muerte es  el" + dia + "de" + mes_palabra + "del" + año + ".Vuelve cuando quieras a darme más recuerdos, más amor, más vida");
      estaHablando = false}; 
    
    

  } else if (estado == 11) {
    createCanvas(600, 600);
  }
}
