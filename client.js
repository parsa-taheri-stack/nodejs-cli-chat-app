import net from "node:net";
import readline from "node:readline";
import chalk from "chalk";

const client = net.connect({ port: 8080 });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const usernameIn = new Promise((resolve) => {
  rl.question("Enter an username: ", (username) => {
    resolve(username);
  });
});

usernameIn.then((username) => {
  rl.on("line", (message) => {
    client.write(JSON.stringify({ username, message }));
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout);
  });

  client.on("data", (data) => {
    const dataObj = JSON.parse(data.toString());
    console.log(
      `${
        username === dataObj.username
          ? chalk.green("You")
          : chalk.red(dataObj.username)
      }: ${dataObj.message}`
    );
  });
});
