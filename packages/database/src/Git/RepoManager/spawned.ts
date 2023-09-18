process.stdin.resume();
process.stdin.setEncoding("utf8");

console.log("quanti anni hai?");

process.stdin.on("data", (input: string) => {
  input = input.trim();
  if (input.length === 0) {
    console.log("Nessuna risposta inserita.");
  } else if (input === ".exit") {
    process.stdout.write(".exit"); // send message to parent process
  } else {
    console.log(`Hai inserito: ${input}`);
  }
});

process.on("SIGINT", () => {
  console.log("Terminating child process...");
  process.stdin.pause();
  process.stdin.removeAllListeners();
  process.exit();
});
