import { spawn } from "child_process";
import { pipeline } from "stream";

let app = spawn("ts-node", ["spawned.ts"]);

if (!process.stdin.isTTY) {
  // Pipe REPL process.stdin to spawned process.stdin
  pipeline(process.stdin, app.stdin, err => {
    if (err) {
      console.error("Failed to pipe stdin:", err);
    }
  });

  // Handle errors on the child process's stdin stream
  app.stdin.on("error", err => {
    console.error("Child process stdin error:", err);
  });
}

// Handle errors on the child process's stdout stream
app.stdout.on("error", err => {
  console.error("Child process stdout error:", err);
});

app.on("spawn", () => {
  console.log("app spawned");
});

app.stdout.on("data", data => {
  const message = data.toString().trim();
  if (message === ".exit") {
    app.stdin.end(); // close child process's stdin stream
    app.kill("SIGINT"); // kill child process
  } else {
    process.stdout.write(data);
  }
});

app.on("exit", (code, signal) => {
  console.log("app exited with code:", code);
});

// Handle the end event on the child process's stdout stream
app.stdout.on("end", () => {
  console.log("Child process stdout ended");
  if (!process.stdin.isTTY) {
    process.stdin.end(); // close the parent process's stdin stream
  }
});
