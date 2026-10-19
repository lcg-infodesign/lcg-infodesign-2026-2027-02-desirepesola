  // Dichiaro la variabile globale vuota (questo xk la uso in più funzioni)
    let palette; 

// Funzione necessaria per caricare file esterni (immagini, suoni, font)
function preload() {} 



// 1. IMPOSTAZIONI DI BASE + VARIABILI GLOBALI
function setup() {
  createCanvas(windowWidth, windowHeight); // canvas creato delle dimensioni della finestra
  console.log('p5.js version:', p5.VERSION);
  angleMode(DEGREES); // sistema di riferimento in gradi
  frameRate (0.5); // framerate basso per evitare effetto stroboscopico

    // Definisco un array della variabile globale (array = prendo random da una lista?)
    palette =[
        // Colori primari
        color(245, 197, 24),        // giallo 
        color(25, 65, 130),         // blu 
        color(210, 45, 40),         // rosso 
        color(240, 240, 240),       // bianco

        // Sfumature secondarie
        color(230, 115, 35),        // arancione 
        color(40, 150, 140),        // turchese
        color(140, 50, 110),        // viola
        color(225, 160, 170),       // rosa 
        color(180, 195, 210),       // azzurro

        // Varianti semitrasparenti (inserisco la 4° variabile per la trasparenza)
        color(25, 65, 130, 180),    // blu trasparente
        color(210, 45, 40, 160),    // rosso trasparente
        color(245, 197, 24, 170)    // giallo trasparente
        ];
}


// 2. DISPOSIZIONE + DISEGNO
function draw() {
  background(10); // imposto un colore di sfondo nero
  
  // => 2.0. IMPOSTAZIONI DELLO SPAZIO
    let centroX = windowWidth / 2; // definisco che il mio centro di larghezza è al centro della finestra web 
    let centroY = (windowHeight / 2) - 50; // definisco che il mio centro d'altezza è leggermente più in alto per lasciare spazio al testo
    let numeroAnelli = 3;  // definisco che la disposizione concentrica è suddivisa in 3 anelli
    
  // => 2.1. DISPOSIZIONE NELLO SPAZIO
    // Creazione degli anelli:
    // creo un ciclo "for" => La variabile a=anello corrente. Quindi iniziamo ad anello 1 fino ad arrivare ad anello 3 compreso.
      for (let a = 1; a <= numeroAnelli; a++) { // a = anello
      let dimensioneGlifo = 10 + (a * 8);  // Crescita equilibrata del glifo (per ogni anello la dimensione aumenta)

    // Definiamo la spaziatura:
      let spaziaturaAnelli = 60; // tra gli anelli creo una spaziatura
      let raggio = a * spaziaturaAnelli; // Ad ogni anello il raggio aumenta progressivamente (altrimenti si sovrappongono gli anelli)
      let numeroGlifi = a * 5; // il numero di glifi aumenta con l'aumentare del raggio (altrimenti rimangono troppi buchi)

    // Trasformazione dei glifi sugli anelli
    // creo un ciclo "for" => La variabile i=glifo. Quidni partiamo dal primo glifo del suo anello, fino ad arrivare al numero di glifi totali sull'anello.
      for (let i = 0; i < numeroGlifi; i++) { // i=glifo
      let angolo = i * (360 / numeroGlifi); // Ad ogni glifo ruoto ciascun glifo per distribuirli in modo uniforme

      push(); //prende lo stato attuale
      translate(centroX, centroY); // spostiamo l'origine al centro della finestra web
      rotate(angolo);              // ruotiamo il canvas in base all'angolo di ciascun glifo
      translate(raggio, 0);        // ci spostiamo verso l'esterno in base al raggio dell'anello, così da posizionarci sul perimetro dell'anello
      
  // => 2.3. DISEGNAMO I DUE TIPI DI GLIFO
      // 1. Glifo principale (al centro della finestraweb)
        disegnaGlifo(0, 0, dimensioneGlifo, palette);
      // 2. Glifo secondario (sfalsato per creare tipo effetto satellite) Ha molta distanza dal centro e dimensione dimezzata
        disegnaGlifo(2.2 * spaziaturaAnelli, 2.2 * spaziaturaAnelli, dimensioneGlifo/2, palette);
      pop();
    }
  }

  // => 2.4 TESTO
  push ();
  fill (245, 197, 24);
  noStroke ();
  textAlign(CENTER);
  textSize (14);
  textStyle (ITALIC)
  text("“L'arte oltrepassa i limiti nei quali il tempo vorrebbe comprimerla, e indica il contenuto del futuro.”", centroX, windowHeight - 80);

  textSize(14);
  textStyle(BOLD);
  text("— Wassily Kandinsky", centroX, windowHeight - 60);
  pop();
}

// 3. CREAZIONE DEL DISEGNO DI BASE
function disegnaGlifo (posx, posy, dim, palette) {
    // variabili della funzione:
    //posx e posy = la posizione in cui verrà disegnato il glifo
    //dim = dimensione (di solito lo utilizzo come fattore di scala)
    //palette = array dei colori da cui attingere in modo casuale


  push();
  translate(posx, posy); // Sposto il centro del sistema di coordinate in posx e posy. Sto disegnando al centro del glifo.
  
  // => 3.0. DISEGNO FORME DI BASE
    // 1. Cerchi
      push();
      scale(random(0.8, 1.2)); // trasformazione di scala entro due parametri
      noStroke();
      fill(random(palette));
      circle(-dim * 0.2, -dim * 0.15, dim * 0.8); 
      pop();

      push ();
      scale(random(0.8, 1.2)); // trasformazione di scala entro due parametri
      noFill ();
      stroke(random(palette));
      circle (0, 0, dim ); 
      strokeWeight (1);
      pop();

    // 2. Rettangolo
      push();
      rotate(random(0,360)); // trasformazione di rotazione totale
      fill(random(palette));
      rect(dim * 0.1, dim * 0.15, dim * 0.6, dim * 0.6);
      pop();

    // 3. Linee e Archi 
      push();
      scale(random(0.8,1.5)); // trasformazione di scala entro due parametri
      rotate(random(0,360)); // trasformazione di rotazione totale
      stroke(random(palette));
      strokeWeight(1);
      line(-dim * 0.5, -dim * 0.5, dim * 0.5, dim * 0.5);

      strokeWeight(1.5);
      line(-dim * 0.3, dim * 0.3, dim * 0.3, -dim * 0.3);

      noFill();
      stroke(random(palette));
      strokeWeight(1.5);
      arc(0, 0, dim * 1.2, dim * 1.2, 180, 270);

      stroke(random(palette));
      strokeWeight(2);
      line(0, 0, dim * 0.6, dim * 0.6);
      pop();

    // 4. Dettagli geometrici
      // creo un ciclo "for" per creare più dettagli
      let numerodettagli = 2;
      for (let e = 0; e < numerodettagli; e++) {
      // Creo uno spostamento casuale per ogni dettaglio
      let spostamentox = random(-dim * 0.5, dim * 0.5);
      let spostamentoy = random(-dim * 0.5, dim * 0.5);
    
      push();
      rotate(random(0,360)); // trasformazione di rotazione totale
      fill(random(palette));
      noStroke();
      circle(dim + spostamentox, -dim * 0.3 + spostamentoy, dim * 0.15);

      stroke(random(palette));
      strokeWeight(1);
      line(0, 0, dim * 0.2, dim * 0.1);
      line(0, 0, dim * 0.2, dim * 0.2);
      pop();
  }
  pop();
}
