const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');

let userInput = ""; // Praćenje unosa korisnika

// Funkcija za crtanje kvadrata
function drawSquare(x, y, width, height, color, text = "") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);

  if (text) {
    ctx.fillStyle = "black";
    ctx.font = "50pt Courier";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + width / 2, y + height / 2);
  }
}

// Funkcija za iscrtavanje svih elemenata
function drawCanvas() {
  drawSquare(0, 0, 100, 100, "orange", "/");
  drawSquare(100, 0, 100, 100, "orange", "*");
  drawSquare(200, 0, 100, 100, "orange", "-");
  drawSquare(0, 100, 100, 100, "white", "7");
  drawSquare(100, 100, 100, 100, "white", "8");
  drawSquare(200, 100, 100, 100, "white", "9");
  drawSquare(0, 200, 100, 100, "white", "4");
  drawSquare(100, 200, 100, 100, "white", "5");
  drawSquare(200, 200, 100, 100, "white", "6");
  drawSquare(0, 300, 100, 100, "white", "1");
  drawSquare(100, 300, 100, 100, "white", "2");
  drawSquare(200, 300, 100, 100, "white", "3");
  drawSquare(0, 400, 300, 100, "white", "0");

  // Polja za operacije
  drawSquare(300, 0, 100, 100, "orange", "+");
  drawSquare(300, 100, 100, 100, "orange", "C");
  drawSquare(300, 200, 100, 200, "orange", "=");

  // Polje koje se ignoriše
  drawSquare(300, 400, 100, 100, "gray");
}

// Funkcija za obradu klikova
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left; // Koordinata x u canvasu
  const y = event.clientY - rect.top; // Koordinata y u canvasu

  // Određivanje reda i kolone na osnovu koordinata
  let col = Math.floor(x / 100); // Kolona
  let row = Math.floor(y / 100); // Red

  let value = null; // Vrednost koja će biti dodata unosu korisnika

  // Logika za prepoznavanje brojeva i operacija
  if (row === 4 && col === 3) return; // Ignoriši sivo polje
  if (row >= 0 && row <= 4 && col >= 0 && col <= 2) {
    // Brojevi prema poziciji u canvasi
    const numberGrid = [
      ["/", "*", "-"], // Operacije u prvom redu
      ["7", "8", "9"], // Red 1
      ["4", "5", "6"], // Red 2
      ["1", "2", "3"], // Red 3
      ["0", null, null], // Red 4
    ];
    value = numberGrid[row][col];
  } else if (col === 3) {
    // Operacije prema koloni 3
    const operationGrid = ["+", "C", "="]; // Operacije u odgovarajućim redovima
    value = operationGrid[row]; // Pomak za operacije
  }

  // Obrada vrednosti na osnovu unosa
  if (value === "C") {
    userInput = ""; // Reset unosa
  } else if (value === "=") {
    try {
      userInput = Math.floor(eval(userInput)); // Izračunavanje rezultata
    } catch {
      userInput = 0; // Postavljanje na 0 ako dođe do greške
    }
  } else if (value !== null) {
    userInput += value + " "; // Dodavanje vrednosti unosa
  }

  // Ažuriranje prikaza unosa
  output.textContent = userInput.trim();
}

// Crtanje canvasa
drawCanvas();

// Dodavanje event listener-a za klik
canvas.addEventListener("click", handleClick);
