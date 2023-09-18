import { spawn } from "child_process";
import { pipeline } from "stream";

let app: any; // Variabile per memorizzare il processo

function runApp() {
  // Crea un nuovo processo utilizzando la funzione spawn
  app = spawn("ts-node", ["spawned.ts"]);

  // Collega lo stdin del processo principale allo stdin del processo figlio
  pipeline(process.stdin, app.stdin, (err: any) => {
    if (err) {
      console.error(
        "Errore durante la connessione degli stream di input:",
        err
      );
    }
  });

  // Attiva la lettura degli input nello stream del processo figlio
  app.stdin.resume();

  console.log(
    "Applicazione avviata. Digita 'exit' per uscire."
  );
}

function exitApp() {
  // Metti in pausa lo stdin del processo principale e del processo figlio
  process.stdin.pause();
  app.stdin.pause();

  // Chiudi il processo figlio
  app.kill();

  console.log(
    "Applicazione terminata. Digita 'avvia' per riavviare."
  );
}

// Attiva la lettura degli input dalla console
process.stdin.setEncoding("utf-8");
process.stdin.on("data", (data: string) => {
  if (data.trim() === "avvia") {
    runApp();
  } else if (data.trim() === "exit") {
    exitApp();
  } else if (app) {
    // Se la variabile app è definita, invia l'input al processo figlio
    app.stdin.write(data);
  } else {
    console.log(
      "Applicazione non avviata. Digita 'avvia' per avviare."
    );
  }
});

console.log("Digita 'avvia' per avviare l'applicazione.");
